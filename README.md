# Pongbot Team Drill Studio

A static React web app for editing and exporting Pongbot Nova S Pro drill CSV files.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `pongbot-drill-studio`.
2. Upload all files from this project, including the `.github` directory.
3. In GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Push or commit to the `main` branch.
6. Open **Actions** and wait for `Deploy to GitHub Pages` to complete.
7. The public URL will be shown in the deployment job and under **Settings > Pages**.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Data storage

- Current working drills are saved in browser `localStorage`.
- The latest imported CSV is cached separately in browser `localStorage`.
- Imported CSV contents are not uploaded to a server by this app.
- Each browser/device has its own local drill library.

## CSV columns

`Set;Ball;Name;Speed;Spin;Type;Height;Drop;BPM;Reps`
