# Project Blueprint

## Overview

This is a web application that integrates with the cTrader platform, built with the latest Angular features. It allows users to authenticate via OAuth2, connect to the Spotware SDK, and view their trading accounts. The application is built entirely with standalone components and uses signals for reactive state management, focusing on a clean, modern, and maintainable architecture.

---

## Phase 1: Core Logic & SDK Integration (Completed)

The initial phase focused on establishing a robust foundation for the application. All core logic for authentication and data fetching is now complete.

### Implemented Features:

*   **Full OAuth2 Authentication:** Complete login flow via cTrader ID.
*   **Token Management:** A dedicated `AuthCallbackComponent` handles the token exchange and secure storage.
*   **Reactive Ctrader Service:** A new `Ctrader` service (`ctrader.ts`) encapsulates all SDK logic.
*   **Connection State:** The service uses an Angular signal (`connected`) to broadcast its connection status.
*   **SDK Integration:** The service successfully initializes the `@spotware-web-team/sdk` and connects to the host.

---

## Phase 2: UI/UX & Visual Polish (Completed)

This phase transformed the basic application into a visually appealing and user-friendly experience, with proper state management (loading, error, success) and a modern, dark-theme design.

### Implemented Features:

*   **Global Styling:** A professional, dark color palette and typography have been applied globally.
*   **Engaging Home Page:** The landing page is now a clear and attractive call-to-action.
*   **Robust Data Display:** The `Prices` component now uses styled cards to display account information and handles loading/error states gracefully.
*   **Modern Angular Syntax:** The UI is built with the latest `@if` control flow and leverages signals for reactivity.

---

## Phase 3: Finalize Account Data Fetching (Current)

This is the core functional phase. The goal is to successfully fetch and display the user's account information (balance, currency, leverage), which is a prerequisite for any further data fetching like OHLC.

### Plan & Steps:

1.  **Correct OAuth Scopes:** The current authentication request is likely missing the necessary permissions to read account data. 
    *   **Action:** Modify the `ctrader-login.component.ts` to request both `trading` and `accounts` scopes during the OAuth2 flow. This will grant the application the required permissions.

2.  **Verify Data Display:** After the user re-authenticates with the new scopes, confirm that the `prices` component correctly displays the account balance, currency, and leverage.
