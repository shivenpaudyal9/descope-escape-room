# Descope Escape Room — Solution

A React app built around the [Descope](https://www.descope.com/) authentication SDK. The challenge involves progressively passing a series of server-side JWT validation checks (ERR001–ERR010) by correctly setting up auth flows, tenant permissions, MFA, and finally step-up authentication.

## The Problem

The app sends a session token to a backend API that validates the JWT against 10 conditions. The final blocker — **ERR010** — checks for `jwt.token.su === true`, which is Descope's stepped-up authentication claim. Standard MFA at login (`amr: ["sms", "totp", "mfa"]`) is not enough; step-up is a separate post-login re-verification that signals elevated trust.

## The Fix

After the initial `sign-up-or-in` flow completes, the app now renders a second Descope flow (`step-up`) before calling the API. Once the user completes the step-up challenge, the resulting `sessionJwt` carries `su: true` and the API call succeeds.

The key detail: the fresh token comes from `e.detail.sessionJwt` in the `onSuccess` callback — not from `useSession()`, which may not reflect the updated token immediately.

## Stack

- React 18
- [`@descope/react-sdk`](https://www.npmjs.com/package/@descope/react-sdk) v2.x

## Running locally

```bash
npm install
npm start
```
