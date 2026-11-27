import { Router, type IRouter } from "express";

const router: IRouter = Router();

const WORKBOOK_URL =
  "REDACTED_REVOKED_ONEDRIVE_SHARE_LINK";
const XLSX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

router.get("/lineup-workbook", async (req, res): Promise<void> => {
  try {
    const upstream = await fetch(WORKBOOK_URL, {
      headers: {
        Accept: XLSX_CONTENT_TYPE,
        "User-Agent": "Whitehaven-Waves-Lineup/1.0",
      },
      redirect: "follow",
    });

    if (!upstream.ok) {
      req.log.warn(
        { status: upstream.status },
        "Lineup workbook source returned an error",
      );
      res.status(502).json({ error: "The lineup workbook is unavailable." });
      return;
    }

    const workbook = Buffer.from(await upstream.arrayBuffer());
    res
      .status(200)
      .set("Content-Type", upstream.headers.get("content-type") ?? XLSX_CONTENT_TYPE)
      .set("Cache-Control", "no-store")
      .send(workbook);
  } catch (error) {
    req.log.error({ err: error }, "Unable to fetch lineup workbook");
    res.status(502).json({ error: "The lineup workbook is unavailable." });
  }
});

export default router;