import type {
  BrowserHandler,
  FinickyConfig,
} from "/Applications/Finicky.app/Contents/Resources/finicky.d.ts";

// const handler: BrowserHandler = {
//   match: (url: URL, { opener }) => {
//     return url.host.includes("workplace");
//   },
//   browser: "Brave Browser",
// };

export default {
  defaultBrowser: "Brave Browser",
  options: {
    checkForUpdates: false,
  },
  handlers: [
    // handler,
    {
      match: (url: URL, { opener }) => {
        return url.host.includes("inovex.de");
      },
      browser: {
        name: "Brave Browser",
        profile: "Default",
      }
    },
    {
      match: (url: URL, { opener }) => {
        // console.log("opener", opener);
        return opener?.name.includes("Teams") || opener?.name.includes("Outlook") || false;
      },
      browser: {
        name: "Brave Browser",
        profile: "Profile 3",
      }
    },
    {
      match: (url: URL, { opener }) => {
        return url.host.includes("netrtl.com") || url.host.includes("rtl.de");
      },
      browser: {
        name: "Brave Browser",
        profile: "Profile 3",
      }
    },
       {
      match: (url: URL, { opener }) => {
        return url.host.includes(".schwarz") || url.host.includes("stackit.");
      },
      browser: {
        name: "Brave Browser",
        profile: "Profile 4",
      }
    },
        {
    match: (url: URL, { opener }) => {
        // console.log("opener", opener);
        return opener?.name.includes("Slack") || false;
      },
      browser: {
        name: "Brave Browser",
        profile: "Profile 4",
      }
    },
    {
      match: (url: URL, { opener }) => {
        return opener?.name.includes("Discord") || opener?.name.includes("Mail") || false;
      },
      browser: {
        name: "Brave Browser",
        profile: "Profile 1",
      }
    },
    {
      match: (url: URL, { opener }) => {
        // console.log("opener", opener);
        return opener?.name.includes("Slack") || false;
      },
      browser: "Firefox",
    },
  ],
} satisfies FinickyConfig;
