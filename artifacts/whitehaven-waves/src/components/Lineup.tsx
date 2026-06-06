import { useScrollReveal } from "../hooks/useScrollReveal";

const backRow = [
  { pos: 1, number: "#1", name: "Alex Rivera", role: "Setter" },
  { pos: 6, number: "#6", name: "Jordan Lee", role: "Libero" },
  { pos: 5, number: "#5", name: "Sam Okafor", role: "Outside Hitter" },
];

const frontRow = [
  { pos: 2, number: "#2", name: "Morgan Chen", role: "Right Side Hitter" },
  { pos: 3, number: "#3", name: "Casey Walsh", role: "Middle Blocker" },
  { pos: 4, number: "#4", name: "Riley Storm", role: "Outside Hitter" },
];

const roster = [
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

function PlayerPin({ number, name, role }: { number: string; name: string; role: string }) {
  return (
    <div className="player-pin">
      <div className="player-pin__dot" />
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

  return (
    <section className="section lineup" id="lineup" ref={ref}>
      <div className="container">
        <span className="section-label">The Starting Six</span>
        <h2 className="section-title section-title--center">Current Line-Up</h2>

        <div className="court reveal">
          <div className="court__surface">
            <div className="court__net" />

            <div className="court__row court__row--back">
              {backRow.map(p => (
                <PlayerPin key={p.pos} number={p.number} name={p.name} role={p.role} />
              ))}
            </div>

            <div className="court__row court__row--front">
              {frontRow.map(p => (
                <PlayerPin key={p.pos} number={p.number} name={p.name} role={p.role} />
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

        <div className="roster reveal">
          <h3 className="roster__title">Full Squad Roster</h3>
          <div className="roster__table-wrap">
            <table className="roster__table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Height</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {roster.map(player => (
                  <tr key={player.num} className={`roster__row${player.starter ? " roster__row--starter" : ""}`}>
                    <td>{player.num}</td>
                    <td>{player.name}</td>
                    <td>{player.pos}</td>
                    <td>{player.height}</td>
                    <td>
                      <span className={`badge badge--${player.status}`}>
                        {player.status === "active" ? "Active" : player.status === "bench" ? "Bench" : "Injured"}
                      </span>
                    </td>
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
