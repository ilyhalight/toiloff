declare namespace App {
  interface Locals {
    user: import("./lib/api/auth").UserEntry | null;
  }
}
