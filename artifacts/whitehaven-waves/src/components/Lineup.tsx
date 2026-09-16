import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { useScrollReveal } from "../hooks/useScrollReveal";

const WORKBOOK_URL =
  "https://1drv.ms/x/c/48681ba6434674fe/IQCCOwMsOHqTRI5eX0wO_vP2ASvzMv8FqYsmANDBEQ51bIQ?e=oLCFUt&nav=MTVfe0Q1NkUwNjc3LTEyQTgtNDI4OS1BODg2LUJEM0ZBMkRGRTVGM30";
const WORKBOOK_API_PATH = "/api/lineup-workbook";

type RosterStatus = "active" | "bench" | "injury";

interface RosterPlayer {
  num: number;
  name: string;
  pos: string;
  height: string;
  status: RosterStatus;
  starter: boolean;
}

interface CourtPlayer extends Omit<RosterPlayer, "pos"> {
  pos: number;
  number: string;
  role: string;
}

const fallbackRoster: RosterPlayer[] = [
  { num: 1, name: "Alex Rivera", pos: "Setter", height: "5'10\"", status: "active", starter: true },
  { num: 2, name: "Morgan Chen", pos: "Right Side Hitter", height: "6'1\"", status: "active", starter: true },
  { num: 3, name: "Casey Walsh", pos: "Middle Blocker", height: "6'3\"", status: "active", starter: true },
  { num: 4, name: "Riley Storm", pos: "Outside Hitter", height: "5'11\"", status: "active", starter: true },
  { num: 5, name: "Sam Okafor", pos: "Outside Hitter", height: "6'0\"", status: "active", starter: true },
  { num: 6, name: "Jordan Lee", pos: "Libero", height: "5'8\"", status: "active", starter: true },
  { num: 7, name: "Taylor Knox", pos: "Setter", height: "5'9\"", status: "bench", starter: false },
  { num: 8, name: "Drew Summers", pos: "Middle Blocker", height: "6'2\"", status: "bench", starter: false },
  { num: 9, name: "Avery Banks", pos: "Opposite", height: "6'1\"", status: "injury", starter: false },
];

function normalizeHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getCell(row: Record<string, unknown>, aliases: string[]) {
  const key = Object.keys(row).find((header) =>
    aliases.includes(normalizeHeader(header)),
  );
  return key ? row[key] : "";
}

function parseNumber(value: unknown, fallback: number) {
  const number = Number(String(value ?? "").replace(/[^0-9]/g, ""));
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function parseStatus(value: unknown): Pick<RosterPlayer, "status" | "starter"> {
  const normalized = String(value ?? "").trim().toLowerCase();

  if (["injured", "injury"].includes(normalized)) {
    return { status: "injury", starter: false };
  }

  if (["active", "yes", "y", "true", "1", "starter", "starting"].includes(normalized)) {
    return { status: "active", starter: true };
  }

  return { status: "bench", starter: false };
}

function parseWorkbook(buffer: ArrayBuffer): RosterPlayer[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!firstSheet) throw new Error("The workbook does not contain a sheet.");

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, {
    defval: "",
    raw: false,
  });

  const parsed = rows.flatMap((row, index) => {
    const name = String(getCell(row, ["name"]) ?? "").trim();
    if (!name) return [];

    const status = parseStatus(getCell(row, ["active"]));
    return [{
      num: parseNumber(getCell(row, ["number", "no", "playernumber"]), index + 1),
      name,
      pos: String(getCell(row, ["position", "positon", "pos"]) ?? "").trim() || "Player",
      height: String(getCell(row, ["height"]) ?? "").trim() || "—",
      ...status,
    }];
  });

  if (!parsed.length) {
    throw new Error("No player rows were found in the workbook.");
  }

  return parsed;
}

interface PlayerPinProps {
  pos: number;
  number: string;
  name: string;
  role: string;
  isSelected: boolean;
  onHover: (pos: number | null) => void;
}

function PlayerPin({ pos, number, name, role, isSelected, onHover }: PlayerPinProps) {
  return (
    <div
      className="player-pin"
      onMouseEnter={() => onHover(pos)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={`player-pin__dot${isSelected ? " player-pin__dot--active" : ""}`} />
      <div className="player-pin__info">
        <span className="player-pin__number">{number}</span>
        <span className="player-pin__name">{name}</span>
        <span className="player-pin__role">{role}</span>
      </div>
    </div>
  );
}

export default function Lineup() {
  const ref = useScrollReveal();
  const [hovered, setHovered] = useState<number | null>(null);
  const [roster, setRoster] = useState<RosterPlayer[]>(fallbackRoster);
  const [sourceStatus, setSourceStatus] = useState<"loading" | "live" | "fallback">("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadRoster() {
      try {
        const response = await fetch(WORKBOOK_API_PATH, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error(`Workbook request failed: ${response.status}`);
        const players = parseWorkbook(await response.arrayBuffer());
        setRoster(players);
        setSourceStatus("live");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setSourceStatus("fallback");
      }
    }

    void loadRoster();
    return () => controller.abort();
  }, []);

  const { frontRow, backRow } = useMemo(() => {
    const starters = roster
      .filter((player) => player.starter)
      .sort((a, b) => a.num - b.num)
      .slice(0, 6);
    const playersByNumber = new Map(starters.map((player) => [player.num, player]));
    const fallbackOrder = starters.map((player) => player.num);

    const toCourtPlayers = (numbers: number[]): CourtPlayer[] => {
      const players = numbers.map((number) => playersByNumber.get(number));
      const orderedPlayers = players.every(Boolean)
        ? players
        : fallbackOrder.map((number) => playersByNumber.get(number));

      return orderedPlayers.filter((player): player is RosterPlayer => Boolean(player)).map((player) => ({
        ...player,
        pos: player.num,
        number: `#${player.num}`,
        role: player.pos,
      }));
    };

    return {
      frontRow: toCourtPlayers([4, 3, 2]),
      backRow: toCourtPlayers([5, 6, 1]),
    };
  }, [roster]);

  const hoveredPlayer = hovered !== null
    ? [...frontRow, ...backRow].find(p => p.pos === hovered)
    : null;

  return (
    <section className="section lineup" id="lineup" ref={ref}>
      <div className="container">
        <span className="section-label">The Starting Six</span>
        <h2 className="section-title section-title--center">Current Line-Up</h2>

        <div className="court reveal">
          <div className="court__surface">
            {/* Net at the top edge — opponent's side is above */}
            <div className="court__net-top">
              <span className="court__net-label court__net-label--opponent">Opponents' side</span>
              <div className="court__net-bar" />
              <span className="court__net-label court__net-label--ours">Our side ↓</span>
            </div>

            {/* Front row (nearest to net) */}
            <div className="court__row court__row--front">
              {frontRow.map(p => (
                <PlayerPin
                  key={p.pos}
                  {...p}
                  isSelected={hovered === p.pos}
                  onHover={setHovered}
                />
              ))}
            </div>

            {/* Back row */}
            <div className="court__row court__row--back">
              {backRow.map(p => (
                <PlayerPin
                  key={p.pos}
                  {...p}
                  isSelected={hovered === p.pos}
                  onHover={setHovered}
                />
              ))}
            </div>

            <div className="court__ball">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="white" opacity="0.9"/>
                <path d="M2 20 Q10 8 20 8 Q30 8 38 20" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
                <path d="M2 20 Q10 32 20 32 Q30 32 38 20" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
                <path d="M14 2 Q8 14 8 20 Q8 26 14 38" stroke="#06b6d4" strokeWidth="1.5" fill="none"/>
                <path d="M26 2 Q32 14 32 20 Q32 26 26 38" stroke="#06b6d4" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Player card that shows when hovering */}
        <div className={`court__hover-card${hoveredPlayer ? " court__hover-card--visible" : ""}`}>
          {hoveredPlayer ? (
            <>
              <span className="court__hover-num">{hoveredPlayer.number}</span>
              <span className="court__hover-name">{hoveredPlayer.name}</span>
              <span className="court__hover-role">{hoveredPlayer.role}</span>
            </>
          ) : (
            <span className="court__hover-hint">Hover a player dot to highlight their profile</span>
          )}
        </div>

        <div className="roster reveal">
          <div className="roster__heading">
            <h3 className="roster__title">Full Squad Roster</h3>
            <a
              className="roster__source"
              href={WORKBOOK_URL}
              target="_blank"
              rel="noreferrer"
            >
              {sourceStatus === "loading"
                ? "Updating from workbook…"
                : sourceStatus === "live"
                  ? "Live workbook ↗"
                  : "Workbook unavailable · Showing saved roster"}
            </a>
          </div>
          <div className="roster__table-wrap">
            <table className="roster__table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {roster.map(player => (
                  <tr
                    key={player.num}
                    className={[
                      "roster__row",
                      player.starter ? "roster__row--starter" : "",
                      hovered === player.num ? "roster__row--highlighted" : "",
                    ].join(" ")}
                    onMouseEnter={() => player.starter ? setHovered(player.num) : null}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <td>{player.num}</td>
                    <td>{player.name}</td>
                    <td>{player.pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
