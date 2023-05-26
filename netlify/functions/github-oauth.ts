import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

// Setting up OAuth was hard an I eventually settled on a "serverside"
// Netlify Function being the best tool for the job.
// This script is redirected to by "https://github.com/login/oauth/authorize?client_id={clientId}"
// and then redirects back to the front page with the access token in the query params.

// See all links I had for myself to figure this out below
//   https://github.com/octokit/octokit.js/#constructor-options
//   https://github.com/octokit/auth-app.js
//   https://github.com/octokit/auth-token.js
//   https://github.com/octokit/auth-oauth-app.js
//   basic oauth x
//   https://www.phind.com/search?cache=3644460f-e3f8-4b62-b183-b604dfa2f5d8
//   creating an app
//   https://www.phind.com/search?cache=520f39b2-f16e-4919-907f-817375b6c79f
//   oauth & device flow x
//   https://www.phind.com/search?cache=c0d4e8d6-3765-483b-86a0-2c35b6f4a6f1
//   netlify O
//   https://www.phind.com/search?cache=758fb223-e5cf-4a01-b0b4-423220c13e7c
//   https://docs.netlify.com/functions/overview/
//   https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow

const handler: Handler = async (event, context) => {
  const { code } = event.queryStringParameters;

  if (!code) {
    return {
      statusCode: 400,
      body: "Missing 'code' query parameter.",
    };
  }

  const clientId = process.env.NETLIFY_OAUTH_CLIENT_ID as string;
  const clientSecret = process.env.NETLIFY_OAUTH_CLIENT_SECRET as string;

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
        }),
      }
    );

    const responseData = await response.json();
    console.log(responseData);
    const accessToken = responseData.access_token;
    const redirectUrl = `/?access_token=${accessToken}#login`;

    return {
      statusCode: 303,
      headers: {
        Location: redirectUrl,
      },
      body: "",
    };
  } catch (error) {
    console.error("Error during GitHub OAuth:", error);
    return {
      statusCode: 500,
      body: "Error during GitHub OAuth.",
    };
  }
};

export { handler };
