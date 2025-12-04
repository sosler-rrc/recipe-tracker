export function Footer() {
  return (
    <footer>
      <span id="footer-text">
        &copy; Recipe Tracker {new Date().getFullYear()} - Shamus Osler -{" "}
        <a
          className="text-sky-600 hover:underline"
          href="https://github.com/sosler-rrc/recipe-tracker">
          Github
        </a>
      </span>
    </footer>
  );
}
