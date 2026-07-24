export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">ProsperPath</div>
          <p className="footer-description">
            A premium finance experience built for clarity, growth, and long-term success.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Product</h3>
            <a href="/dashboard">Dashboard</a>
            <a href="/transactions">Products</a>
            <a href="/settings">Solutions</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#careers">Careers</a>
          </div>
          <div>
            <h3>Legal</h3>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ProsperPath. All rights reserved.</span>
        <span>Built for modern financial professionals.</span>
      </div>
    </footer>
  );
}
