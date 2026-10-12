import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Check,
  CheckCheck,
  Clock3,
  Hammer,
  House,
  Images,
  Mail,
  Menu,
  PaintRoller,
  PanelsTopLeft,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import homeImage from "@/assets/renovated-home.jpg";
import visserIcon from "@/assets/visser-icon.png";
import bathroomFinish from "@/img-work/acabamento-interior6.jpg";
import laminateFloor from "@/img-work/acabamento-interior5.jpg";
import timberRoof from "@/img-work/acabamento-interior.jpg";
import texturedWall from "@/img-work/acabamento-interior2.jpg";
import paintedRoom from "@/img-work/acabamento-interior3.png";
import protectedWindow from "@/img-work/acabamento-interior4.jpg";
import doorBefore from "@/img-work/door-before.jpg";
import doorAfter from "@/img-work/door-after.jpg";
import sandingCeiling from "@/img-work/visser-at-work.jpg";
import crewScaffold from "@/img-work/helper-at-work.jpg";

const WHATSAPP_URL = "https://wa.me/31617668610";
const EMAIL_ADDRESS = "johanvisser934@gmail.com";

// Ícones por serviço — ordem fixa, alinhada com os arrays de tradução
const SERVICE_ICONS = [Hammer, PaintRoller, PanelsTopLeft, House];

// Imagens do portfólio — ordem fixa, alinhada com o array de tradução
const PORTFOLIO_IMAGES = [
  bathroomFinish,
  laminateFloor,
  timberRoof,
  texturedWall,
  paintedRoom,
  protectedWindow,
  sandingCeiling,
  crewScaffold,
];

export const Route = createFileRoute("/")({
  component: Index,
});

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M20.5 11.7a8.6 8.6 0 0 1-12.7 7.6L3 20.5l1.3-4.6A8.6 8.6 0 1 1 20.5 11.7Z" />
      <path d="M8.2 7.6c.3-.4.7-.2.9.2l.8 1.6c.2.4-.5 1-.6 1.3.6 1.3 1.8 2.5 3.3 3.1.3-.1.8-1 1.2-.8l1.8.8c.4.2.4.6.2 1-.5 1-1.6 1.3-2.7 1-3.1-.8-5.5-3.2-6.2-5.7-.3-.9.5-2.1 1.3-2.5Z" />
    </svg>
  );
}

function Brand() {
  const { t } = useTranslation();
  return (
    <>
      <span className="brand-mark">
        <img src={visserIcon} alt="Logo Visser" width={42} height={44} />
      </span>
      <span>
        VISSER<small>{t("brand.tagline")}</small>
      </span>
    </>
  );
}

function PortfolioPhoto({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="portfolio-photo">
      <img
        src={image}
        alt={alt}
        width={1204}
        height={1600}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const { t } = useTranslation();

  const navigation = [
    [t("nav.services"), "services"],
    [t("nav.benefits"), "benefits"],
    [t("nav.work"), "work"],
    [t("nav.contact"), "contact"],
  ] as const;

  // Arrays de dados traduzidos — tipados via i18next
  const services = (
    t("services.items", { returnObjects: true }) as Array<{
      title: string;
      description: string;
      items: string[];
    }>
  ).map((service, i) => ({
    ...service,
    icon: SERVICE_ICONS[i],
  }));

  const portfolioItems = (
    t("portfolio.items", { returnObjects: true }) as Array<{
      title: string;
      alt: string;
    }>
  ).map((item, i) => ({
    ...item,
    image: PORTFOLIO_IMAGES[i],
  }));

  const portfolioCount = portfolioItems.length + 1; // +1 pelo antes/depois

  return (
    <div>
      <header className="site-header">
        <div className="page-container header-inner">
          <a href="#" className="brand" aria-label={t("brand.ariaLabel")}>
            <Brand />
          </a>
          <nav className="desktop-nav" aria-label={t("nav.ariaLabel")}>
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
          <Button asChild variant="quote" className="header-quote">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> {t("nav.quoteButton")} <ArrowRight />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-button"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label={t("nav.mobileAriaLabel")}>
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowRight size={16} />
              </a>
            ))}
            <div className="mobile-lang-switcher">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="hero">
          <img
            className="hero-image"
            src={homeImage}
            alt={t("hero.imageAlt")}
            width={1920}
            height={1024}
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="page-container hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-line" /> {t("hero.eyebrow")}
              </div>
              <h1>
                {t("hero.headlinePart1")}
                <br />
                {t("hero.headlinePart2")}
                <br />
                <span className="headline-highlight">
                  {t("hero.headlineHighlight")}
                </span>
              </h1>
              <p className="hero-subtitle">
                {t("hero.subtitlePart1")}
                <br />
                {t("hero.subtitlePart2")}
              </p>
              <p className="hero-description">{t("hero.description")}</p>
              <div className="hero-actions">
                <Button asChild variant="quote" size="cta">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon /> {t("hero.ctaWhatsapp")} <ArrowRight />
                  </a>
                </Button>
                <Button
                  variant="email"
                  size="cta"
                  onClick={() => setEmailOpen(true)}
                >
                  <Mail /> {t("hero.ctaEmail")}
                </Button>
              </div>
              <div className="hero-assurances">
                <span>
                  <ShieldCheck /> {t("hero.assuranceQuote")}
                </span>
                <span>
                  <CheckCheck /> {t("hero.assuranceDirect")}
                </span>
              </div>
            </div>
            <div className="image-caption">
              <span className="caption-icon">
                <Sparkles size={20} />
              </span>
              <span>
                {t("hero.captionHeadline")}
                <small>{t("hero.captionSub")}</small>
              </span>
            </div>
          </div>
        </section>

        {/* ── Trust strip ──────────────────────────────── */}
        <div className="trust-strip">
          <div className="page-container trust-inner">
            <span>
              <House /> {t("trust.residential")}
            </span>
            <span>
              <Hammer /> {t("trust.team")}
            </span>
            <span>
              <ShieldCheck /> {t("trust.commitment")}
            </span>
          </div>
        </div>

        {/* ── Services ─────────────────────────────────── */}
        <section id="services" className="section services-section page-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t("services.eyebrow")}</p>
              <h2>
                {t("services.headingPart1")}
                <br className="mobile-break" />
                {t("services.headingPart2")}
              </h2>
            </div>
            <p>
              {t("services.subheadingPart1")}
              <br />
              {t("services.subheadingPart2")}
            </p>
          </div>
          <div className="services-grid">
            {services.map(({ icon: Icon, title, description, items }) => (
              <article className="service-card" key={title}>
                <div className="service-card-top">
                  <span className="service-icon">
                    <Icon strokeWidth={1.6} />
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {items.map((item) => (
                    <li key={item}>
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="link" className="service-link">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("services.requestQuote")} <ArrowRight />
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </section>

        {/* ── Benefits ─────────────────────────────────── */}
        <section id="benefits" className="benefits-section">
          <div className="page-container section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t("benefits.eyebrow")}</p>
                <h2>
                  {t("benefits.headingPart1")}
                  <br />
                  {t("benefits.headingPart2")}
                </h2>
              </div>
              <p>
                {t("benefits.subheadingPart1")}
                <br />
                {t("benefits.subheadingPart2")}
              </p>
            </div>
            <div className="benefits-grid">
              <article>
                <Clock3 />
                <h3>{t("benefits.speed.title")}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: t("benefits.speed.description"),
                  }}
                />
              </article>
              <article>
                <Wallet />
                <h3>{t("benefits.budget.title")}</h3>
                <p>{t("benefits.budget.description")}</p>
              </article>
              <article>
                <Sparkles />
                <h3>{t("benefits.care.title")}</h3>
                <p>{t("benefits.care.description")}</p>
              </article>
            </div>
            <p className="benefit-note">{t("benefits.note")}</p>
          </div>
        </section>

        {/* ── Portfolio ─────────────────────────────────── */}
        <section id="work" className="page-container section portfolio-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t("portfolio.eyebrow")}</p>
              <h2>{t("portfolio.heading")}</h2>
            </div>
            <span className="portfolio-status">
              <Images size={15} />{" "}
              {t("portfolio.workCount", { count: portfolioCount })}
            </span>
          </div>

          <Carousel
            className="portfolio-carousel"
            opts={{ align: "start", loop: true }}
            aria-label={t("portfolio.ariaLabel")}
          >
            <CarouselContent>
              {/* Slide de antes/depois */}
              <CarouselItem className="portfolio-slide">
                <article className="portfolio-item">
                  <div className="portfolio-compare">
                    <figure>
                      <PortfolioPhoto
                        image={doorBefore}
                        alt={t("portfolio.doorComparison.beforeAlt")}
                      />
                      <figcaption>{t("portfolio.before")}</figcaption>
                    </figure>
                    <figure>
                      <PortfolioPhoto
                        image={doorAfter}
                        alt={t("portfolio.doorComparison.afterAlt")}
                      />
                      <figcaption>{t("portfolio.after")}</figcaption>
                    </figure>
                  </div>
                  <div className="portfolio-label">
                    <span>{t("portfolio.doorComparison.title")}</span>
                  </div>
                </article>
              </CarouselItem>

              {/* Slides individuais */}
              {portfolioItems.map(({ image, title, alt }) => (
                <CarouselItem className="portfolio-slide" key={title}>
                  <article className="portfolio-item">
                    <PortfolioPhoto image={image} alt={alt} />
                    <div className="portfolio-label">
                      <span>{title}</span>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="portfolio-controls">
              <CarouselPrevious
                className="portfolio-arrow"
                aria-label={t("portfolio.prevAriaLabel")}
                title={t("portfolio.prevAriaLabel")}
              />
              <CarouselNext
                className="portfolio-arrow"
                aria-label={t("portfolio.nextAriaLabel")}
                title={t("portfolio.nextAriaLabel")}
              />
            </div>
          </Carousel>

          <p className="portfolio-note">{t("portfolio.note")}</p>
        </section>

        {/* ── Contact ──────────────────────────────────── */}
        <section id="contact" className="contact-section">
          <div className="page-container contact-inner">
            <div>
              <p className="eyebrow">{t("contact.eyebrow")}</p>
              <h2>
                {t("contact.headingPart1")}
                <br />
                {t("contact.headingPart2")}
              </h2>
              <p>{t("contact.description")}</p>
            </div>
            <div className="contact-actions">
              <Button asChild variant="quote" size="cta">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> {t("contact.ctaWhatsapp")} <ArrowRight />
                </a>
              </Button>
              <Button variant="ghost" onClick={() => setEmailOpen(true)}>
                <Mail /> {t("contact.ctaEmail")}
              </Button>
              <span>
                <ShieldCheck size={14} /> {t("contact.assurance")}
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="page-container footer">
        <a className="brand footer-brand" href="#">
          <Brand />
        </a>
        <div className="footer-contacts">
          <h3>{t("footer.contactsHeading")}</h3>
          <p>
            <strong>{t("footer.phone")}</strong>{" "}
            <a
              className="footer-contact-link"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              +31 6 17668610
            </a>
          </p>
          <p>
            <strong>{t("footer.email")}</strong>{" "}
            <a
              className="footer-contact-link"
              href={`mailto:${EMAIL_ADDRESS}`}
            >
              {EMAIL_ADDRESS}
            </a>
          </p>
        </div>
        <span>{t("footer.copyright")}</span>
      </footer>

      {/* ── Floating WhatsApp ────────────────────────── */}
      <Button asChild className="floating-whatsapp" variant="quote" size="icon">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp.ariaLabel")}
        >
          <WhatsAppIcon />
        </a>
      </Button>

      {/* ── Email Dialog ─────────────────────────────── */}
      <Dialog
        open={emailOpen}
        onOpenChange={(open) => {
          if (!open) setEmailOpen(false);
        }}
      >
        <DialogContent className="contact-dialog">
          <span className="dialog-icon">
            <Mail />
          </span>
          <DialogTitle>{t("dialog.title")}</DialogTitle>
          <DialogDescription>{t("dialog.description")}</DialogDescription>
          <div className="dialog-tip">
            <Check size={18} />
            <p>{t("dialog.tip")}</p>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <Button asChild variant="quote" style={{ flex: 1 }}>
              <a href={`mailto:${EMAIL_ADDRESS}?subject=Offerte%20aanvraag%20-%20Visser`}>
                <Mail size={16} /> {EMAIL_ADDRESS}
              </a>
            </Button>
            <Button variant="ghost" onClick={() => setEmailOpen(false)}>
              {t("dialog.confirm")} <Check />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
