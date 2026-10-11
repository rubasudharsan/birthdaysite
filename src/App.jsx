
import { useRef, useState } from "react";
import "./index.css";

const starterPhotos = [
  { src: "/images/diya.jpeg", caption: "My Happiness ♡" },
  { src: "/images/diya2.jpeg", caption: "Little Angel ♡" },
  { src: "/images/diya3.jpeg", caption: "Birthday Queen ♡" },
  { src: "/images/diya4.jpeg", caption: "My World ♡" },
  { src: "/images/diya5.jpeg", caption: "My Sunshine ♡" },
  { src: "/images/diya6.jpeg", caption: "My Little Princess ♡" },
  { src: "/images/diya7.jpeg", caption: "My Sweetheart ♡" },
  { src: "/images/diya8.jpeg", caption: "My Little Star ♡" },
  { src: "/images/diya9.jpeg", caption: "My Little Angel ♡" },
  { src: "/images/diya10.jpeg", caption: "My Little Love ♡" },
];

export default function App() {
  const [photos, setPhotos] = useState(starterPhotos);
  const [letter, setLetter] = useState(
    "En chella kutty Diyasri... ♡\n\nUn sirippu enga veettukku santhosham kondu varum.\nUn azhagana mugathil eppodhum sirippu irukkanum.\nUn kanavugal ellam nijamaaga vendum.\nNee eppodhum happy-ah irukkanum, chellame! 🌸\n\nHappy 4th Birthday, Diyasri! 👑\nYou are our little princess, today and always. 💗"
  );
  const [editing, setEditing] = useState(false);
  const [surprise, setSurprise] = useState(false);
  const [lightbox, setLightbox] = useState("");
  const [confetti, setConfetti] = useState([]);
  const [musicOn, setMusicOn] = useState(false);
  const inputRef = useRef(null);
  const audioRef = useRef(null);

  function uploadPhotos(event) {
    const files = Array.from(event.target.files || []);
    const additions = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        src: URL.createObjectURL(file),
        caption: "A Special Memory ♡",
      }));

    setPhotos((old) => [...old, ...additions]);
    event.target.value = "";
  }

  async function toggleMusic() {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch {
        alert("Optional music file: public/music/Magale.mp3");
      }
    }
  }

  function celebrate() {
    setConfetti(
      Array.from({ length: 55 }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1.5}s`,
        duration: `${2.5 + Math.random() * 2.5}s`,
        emoji: ["💗", "💕", "✨", "🌸", "🎉", "💖"][
          Math.floor(Math.random() * 6)
        ],
      }))
    );
    setSurprise(true);
  }

  return (
    <div className="site">
      <audio ref={audioRef} src="/music/Magale.mp3" loop />

      <div className="confetti-layer" aria-hidden="true">
        {confetti.map((item) => (
          <span
            key={item.id}
            className="confetti"
            style={{
              left: item.left,
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      <header className="navbar">
        <a className="brand" href="#home">💗 With Love</a>

        <nav>
          <a href="#home">⌂ <span>Home</span></a>
          <a href="#memories">▧ <span>Memories</span></a>
          <a href="#letter">✉ <span>Love Letter</span></a>
          <a href="#surprise">🎁 <span>Surprise</span></a>
        </nav>

        <button className="music-button" onClick={toggleMusic}>
          ♫ {musicOn ? "Music On" : "Music"}
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <span className="float heart-one">💗</span>
          <span className="float star-one">✨</span>

          <div className="hero-copy">
            <div className="eyebrow">
              A SPECIAL DAY FOR OUR LITTLE PRINCESS
            </div>

            <h1>
              Happy Birthday,
              <span>Diyasri!</span>
            </h1>

            <div className="crown">👑</div>

            <p>
              4 years of pure happiness,
              <br />
              sweetness and endless love...
            </p>

            <a className="pink-button" href="#surprise">
              ♡ Open My Surprise <b>➜</b>
            </a>

            <div className="note">You make every day magical! ♡</div>
          </div>

          <div className="hero-visual">
            <img
              className="cartoon-art"
              src="/images/cartoon-birthday-art.png"
              alt="Cute birthday princess, cake, balloons and teddy bear"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />


            <div className="photo-frame">
              <img
                src={`${import.meta.env.BASE_URL}images/diyasri-main.jpg`}
                alt="Diyasri birthday"
                onError={(event) => {
                  event.currentTarget.style.display = "none";

                  const placeholder =
                    event.currentTarget.nextElementSibling;

                  if (placeholder) {
                    placeholder.style.display = "flex";
                  }
                }}
              />

              <div className="photo-placeholder">
                <span>👑</span>
                <strong>Diyasri</strong>
                <small>Our Little Princess</small>
                <span className="cake">🎂</span>
              </div>

              <div className="photo-caption">
                Our little princess ♡
              </div>
            </div>


            <span className="balloon balloon-a">🎈</span>
            <span className="balloon balloon-b">🎈</span>
            <span className="teddy">🧸</span>
          </div>

        </section>

        <section className="memories section" id="memories">
          <div className="section-intro">
            <div className="section-emoji">📸</div>
            <h2>Our Beautiful<br />Memories</h2>
            <p>Every smile, every moment,<br />a beautiful memory.</p>
            <div className="squiggle">♡ ───── ♡</div>
          </div>

          <div className="gallery">
            {photos.map((photo, i) => (
              <article className="memory-card" key={`${photo.src}-${i}`}>
                <button
                  className="memory-image"
                  onClick={() => setLightbox(photo.src)}
                  aria-label="View photo"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <span className="image-fallback">🌸</span>
                </button>
                <div className="memory-caption">{photo.caption}</div>
              </article>
            ))}

            <button
              className="upload-card"
              onClick={() => inputRef.current?.click()}
            >
              <span className="upload-icon">⇧</span>
              <b>Upload Photos</b>
              <small>Add more memories<br />to this special page</small>
              <span className="choose-files">▧ Choose Files</span>
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={uploadPhotos}
            />
          </div>
        </section>

        <section className="letter-section section" id="letter">
          <div className="letter-intro">
            <div className="envelope">💌</div>
            <h2>A Letter<br />Just for You</h2>
            <p>Some words from my heart...</p>
            <div className="squiggle">♡ ───── ♡</div>
          </div>

          <div className="paper">
            <span className="paper-flower">🌸</span>

            {editing ? (
              <div className="editor">
                <textarea
                  value={letter}
                  onChange={(event) => setLetter(event.target.value)}
                  aria-label="Birthday letter"
                />
                <button
                  className="pink-button"
                  onClick={() => setEditing(false)}
                >
                  ♡ Save Letter
                </button>
              </div>
            ) : (
              <>
                <div className="letter-text">
                  {letter.split("\n").map((line, i) => (
                    <p key={i}>{line || "\u00a0"}</p>
                  ))}
                </div>
                <div className="signature">With all my love, ♡</div>
              </>
            )}
          </div>

          <div className="letter-cartoon">
            <span>👸🏻</span>
            <span>🎈</span>
            <span>🐰</span>
            <small>Lots of love for you! 💕</small>
          </div>

          {!editing && (
            <button className="edit-button" onClick={() => setEditing(true)}>
              ✍️ Edit Letter
            </button>
          )}
        </section>

        <section className="surprise-section" id="surprise">
          <div className="gift">🎁</div>

          <div className="surprise-copy">
            <h2>One Last Surprise</h2>
            <p>A special message just for you...</p>
            <div className="squiggle">♡ ───── ♡</div>
          </div>

          <button className="magic-button" onClick={celebrate}>
            🎁 Click for Magic ✨
          </button>

          <div className="surprise-art">
            <span>🎈 💗 🎉</span>
            <strong>Happy 4th Birthday,<br />Diyasri! ♡</strong>
          </div>
        </section>
      </main>

      <footer>💗 Made with love, just for Diyasri. ♡</footer>

      {surprise && (
        <div className="overlay" onClick={() => setSurprise(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setSurprise(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-balloons">🎈 ✨ 🎈</div>
            <div className="modal-cake">🎂</div>
            <h2>Happy 4th Birthday!</h2>
            <h3>Diyasri 👑</h3>

            <p>
              May your little world always be full of happiness,
              laughter, beautiful dreams and lots of love! 💕
            </p>

            <p className="tamil">
              இனிய 4வது பிறந்தநாள் வாழ்த்துக்கள், தியாஸ்ரீ! 💖
              <br />
              எப்போதும் சந்தோஷமாக இரு, செல்லமே! 🌸
            </p>

            <button className="pink-button" onClick={() => setSurprise(false)}>
              Lots of Love 💗
            </button>
          </div>
        </div>
      )}

      {lightbox && (
        <div className="overlay" onClick={() => setLightbox("")}>
          <div className="lightbox" onClick={(event) => event.stopPropagation()}>
            <button className="close" onClick={() => setLightbox("")}>
              ×
            </button>
            <img src={lightbox} alt="Diyasri memory" />
          </div>
        </div>
      )}
    </div>
  );
}
