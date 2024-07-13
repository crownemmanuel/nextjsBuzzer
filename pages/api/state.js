let currentBuzzer = null;

export default function handler(req, res) {
  if (req.method === "POST") {
    const { action, team } = JSON.parse(req.body);

    if (action === "buzz" && !currentBuzzer) {
      currentBuzzer = team;
    } else if (action === "reset") {
      currentBuzzer = null;
    }

    res.status(200).json({ currentBuzzer });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
