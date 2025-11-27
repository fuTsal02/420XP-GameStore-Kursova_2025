import "./App.css";
import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.png";

const GAMES = [
  {
    id: 1,
    title: "Elden Ring",
    genre: "RPG",
    price: 59.99,
    rating: 9.5,
    image:
      "https://www.candb.com/site/candb/images/artwork/elden-ring_bandai-namco.jpg",
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    genre: "Action RPG",
    price: 39.99,
    rating: 8.4,
    image:
      "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7",
  },
  {
    id: 3,
    title: "Hades",
    genre: "Roguelike",
    price: 19.99,
    rating: 9.0,
    image:
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000033131/dbc8c55a21688b446a5c57711b726956483a14ef8c5ddb861f897c0595ccb6b5",
  },
  {
    id: 4,
    title: "The Witcher 3",
    genre: "RPG",
    price: 29.99,
    rating: 9.7,
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/96b8627588997030e5a6b56ca5e9944756c8f288/capsule_616x353.jpg?t=1761131270",
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    genre: "Adventure",
    price: 49.99,
    rating: 9.8,
    image:
      "https://media-rockstargames-com.akamaized.net/mfe6/prod/__common/img/949e0a50124a889b098f73cedc29fb3b.jpg",
  },
  {
    id: 6,
    title: "God of War",
    genre: "Action",
    price: 39.99,
    rating: 9.4,
    image:
      "https://gaming-cdn.com/images/products/7325/orig/god-of-war-pc-game-steam-europe-cover.jpg?v=1744715989",
  },
  {
    id: 7,
    title: "Horizon Zero Dawn",
    genre: "Action RPG",
    price: 29.99,
    rating: 9.1,
    image:
      "https://image.api.playstation.com/vulcan/img/rnd/202009/3000/C14XMwZBi6CYKOacUDf6EzEs.jpg",
  },
  {
    id: 8,
    title: "Ghost of Tsushima",
    genre: "Action",
    price: 39.99,
    rating: 9.3,
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/b3iB2zf2xHj9shC0XDTULxND.png",
  },
  {
    id: 9,
    title: "GTA V",
    genre: "Action",
    price: 19.99,
    rating: 9.0,
    image:
      "https://irecommend.ru/sites/default/files/imagecache/copyright1/user-images/200677/383853675.jpg",
  },
  {
    id: 10,
    title: "Minecraft",
    genre: "Sandbox",
    price: 29.99,
    rating: 8.8,
    image:
      "https://xboxwire.thesourcemediaassets.com/sites/2/2024/05/Hero-8c18da7c19a1a8811ddb.jpg",
  },
  {
    id: 11,
    title: "Assassin's Creed Valhalla",
    genre: "Action RPG",
    price: 49.99,
    rating: 8.3,
    image:
      "https://cdn1.epicgames.com/400347196e674de89c23cc2a7f2121db/offer/AC%20KINGDOM%20PREORDER_STANDARD%20EDITION_EPIC_Key_Art_Wide_3840x2160-3840x2160-485fe17203671386c71bde8110886c7d.jpg",
  },
  {
    id: 12,
    title: "Starfield",
    genre: "Sci-Fi RPG",
    price: 69.99,
    rating: 7.8,
    image:
      "https://cdn.wccftech.com/wp-content/uploads/2025/08/starfield-cover-1456x819.jpg",
  },
];

const HADES_SCREENSHOTS = [
  "https://www.rpgfan.com/wp-content/uploads/2020/08/Hades-Screenshot-024.jpg",
  "https://interfaceingame.com/wp-content/uploads/hades/hades-in-game.jpg",
  "https://www.newgamenetwork.com/app/uploads/2025/10/hades_03_2.jpg",
  "https://www.rpgfan.com/wp-content/uploads/2020/08/Hades-Screenshot-021.jpg",
];

function App() {
  // ===== ЛОТИ КОРИСТУВАЧА (збережені) =====
  const [userLots, setUserLots] = useState(() => {
    try {
      const savedLots = localStorage.getItem("gamestore_lots");
      return savedLots ? JSON.parse(savedLots) : [];
    } catch {
      return [];
    }
  });
  const [isCreateLotOpen, setIsCreateLotOpen] = useState(false);
  const [lotTitle, setLotTitle] = useState("");
  const [lotImages, setLotImages] = useState("");
  const [lotDescription, setLotDescription] = useState("");
  const [lotKey, setLotKey] = useState("");
  const [lotGenre, setLotGenre] = useState("RPG");
  const [lotPrice, setLotPrice] = useState("");

  // ===== ФІЛЬТРИ / СОРТУВАННЯ =====
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Усі жанри");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [activeGame, setActiveGame] = useState(null); // для сторінки гри
  const [hadesSlide, setHadesSlide] = useState(0); // поточний скрін Hades
  const [logoClicks, setLogoClicks] = useState(0);
  const [easterEggVisible, setEasterEggVisible] = useState(false);

  // ===== УЛЮБЛЕНІ ІГРИ (сердечка) =====
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavs = localStorage.getItem("gamestore_favorites");
      return savedFavs ? JSON.parse(savedFavs) : [];
    } catch {
      return [];
    }
  });

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // ===== МОДАЛКИ АКАУНТА =====
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // ===== ЮЗЕР (збережений) =====
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("gamestore_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [nicknameInput, setNicknameInput] = useState("");

  // ===== КОШИК (збережений) =====
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("gamestore_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ===== toast-попередження =====
  const [showRegisterWarning, setShowRegisterWarning] = useState(false);
  const toastShownRef = useRef(false);

  // ===== СИНХРОНІЗАЦІЯ З localStorage =====
  useEffect(() => {
    try {
      localStorage.setItem("gamestore_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem("gamestore_lots", JSON.stringify(userLots));
    } catch (e) {
      console.error("Failed to save lots to localStorage", e);
    }
  }, [userLots]);

  useEffect(() => {
    try {
      localStorage.setItem("gamestore_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favorites]);

  // ===== РОЗШИРЕНИЙ СПИСОК ІГОР (спочатку лоти) =====
  const extendedGames = [
    ...userLots.map((lot) => ({
      ...lot,
      rating: 0,
      isUserLot: true,
    })),
    ...GAMES,
  ];

  const filteredGames = extendedGames.filter((game) => {
    const matchesGenre =
      selectedGenre === "Усі жанри" || game.genre === selectedGenre;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      game.title.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query);

    return matchesGenre && matchesSearch;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-asc":
        return a.rating - b.rating;
      case "rating-desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const visibleGames = showOnlyFavorites
    ? sortedGames.filter((g) => favorites.includes(g.id))
    : sortedGames;

  // ===== УЛЮБЛЕНІ =====
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ===== РЕЄСТРАЦІЯ / ЛОГІН =====
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!nicknameInput.trim()) return;

    const newUser = {
      nickname: nicknameInput.trim(),
    };

    setUser(newUser);
    try {
      localStorage.setItem("gamestore_user", JSON.stringify(newUser));
    } catch (e) {
      console.error("Failed to save user to localStorage", e);
    }

    setIsSignupOpen(false);
    setNicknameInput("");
  };

  const handleLogout = () => {
    setUser(null);
    setIsAccountOpen(false);
    setCartItems([]);
    setUserLots([]);
    setFavorites([]);

    try {
      localStorage.removeItem("gamestore_user");
      localStorage.removeItem("gamestore_cart");
      localStorage.removeItem("gamestore_lots");
      localStorage.removeItem("gamestore_favorites");
    } catch (e) {
      console.error("Failed to clear data from localStorage", e);
    }
  };

  // ===== КОШИК =====
  const handleAddToCart = (game) => {
    if (!user) {
      if (!toastShownRef.current) {
        toastShownRef.current = true;

        setShowRegisterWarning(true);

        setTimeout(() => setShowRegisterWarning(false), 1500);

        setTimeout(() => {
          setIsSignupOpen(true);
          toastShownRef.current = false;
        }, 700);
      }

      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === game.id);
      if (existing) {
        return prev.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...game, quantity: 1 }];
    });

    setIsCartOpen(true);
    setIsSortOpen(false);
    setIsGenreOpen(false);
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleCardClick = (game) => {
    if (game.title === "Hades") {
      setActiveGame(game);
      setHadesSlide(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ===== СТВОРЕННЯ ЛОТА =====
  const handleCreateLotSubmit = (e) => {
    e.preventDefault();

    const imagesArray = lotImages
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const imageUrl =
      imagesArray[0] ||
      "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1600";

    const newLot = {
      id: Date.now(),
      title: lotTitle.trim(),
      genre: lotGenre,
      price: Number(lotPrice),
      image: imageUrl,
    };

    setUserLots((prev) => [newLot, ...prev]);

    setLotTitle("");
    setLotImages("");
    setLotDescription("");
    setLotKey("");
    setLotGenre("RPG");
    setLotPrice("");

    setIsCreateLotOpen(false);
  };

  // ===== Маска ключа гри =====
  const formatGameKey = (value) => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const groups = cleaned.match(/.{1,4}/g);
    if (!groups) return "";
    return groups.join("-").substring(0, 19);
  };

  return (
    <div className="app">
      <header className="header">
        <div
          className="logo"
          onClick={() => {
            // Скидання фільтрів
            setSelectedGenre("Усі жанри");
            setSearchQuery("");
            setSortOption("popular");
            setIsGenreOpen(false);
            setIsSortOpen(false);
            setShowOnlyFavorites(false);
            setActiveGame(null);

            // Лічильник пасхалки
            setLogoClicks((c) => {
              const next = c + 1;

              if (next === 7) {
                setEasterEggVisible(true);

                // звук (egg-sound.mp3 поклади в public/)
                const audio = new Audio("/iozhik-zhenia.mp3");
                audio.volume = 0.3; // ГУЧНІСТЬ 0.0 - 1.0
                audio.play().catch(() => {});

                return 0; // після запуску — обнулити
              }

              return next;
            });
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="GameStore Logo" className="logo-img" />
        </div>
        <nav className="nav">
          <button className="nav-btn">Магазин</button>
          <button className="nav-btn">Бібліотека</button>
        </nav>
        <div className="user-block">
          {user && (
            <button
              className="create-lot-btn"
              onClick={() => setIsCreateLotOpen(true)}
            >
              <span className="create-lot-icon">+</span>
              <span>Створити лот</span>
            </button>
          )}

          {user ? (
            <button
              className="user-pill"
              onClick={() => setIsAccountOpen(true)}
            >
              <span className="user-avatar">
                {user.nickname[0]?.toUpperCase()}
              </span>
              <span className="user-name">{user.nickname}</span>
            </button>
          ) : (
            <button className="login-btn" onClick={() => setIsSignupOpen(true)}>
              Увійти
            </button>
          )}

          <button
            className="cart-btn"
            onClick={() => {
              setIsCartOpen(true);
              setIsSortOpen(false);
              setIsGenreOpen(false);
            }}
          >
            🛒{" "}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      <main className="main">
        {activeGame && activeGame.title === "Hades" ? (
          /* ================ СТОРІНКА ГРИ HADES ================ */
          <section className="game-detail">
            <button className="back-btn" onClick={() => setActiveGame(null)}>
              ← Повернутися до магазину
            </button>

            <div className="detail-layout">
              {/* ЛІВА ЧАСТИНА — КАРУСЕЛЬ */}
              <div className="detail-left">
                <div className="detail-carousel">
                  <img
                    src={HADES_SCREENSHOTS[hadesSlide]}
                    alt={`Hades screenshot ${hadesSlide + 1}`}
                    className="detail-main-image"
                  />

                  <button
                    type="button"
                    className="detail-nav prev"
                    onClick={() =>
                      setHadesSlide(
                        (prev) =>
                          (prev - 1 + HADES_SCREENSHOTS.length) %
                          HADES_SCREENSHOTS.length
                      )
                    }
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    className="detail-nav next"
                    onClick={() =>
                      setHadesSlide(
                        (prev) => (prev + 1) % HADES_SCREENSHOTS.length
                      )
                    }
                  >
                    ›
                  </button>
                </div>

                <div className="detail-thumbs">
                  {HADES_SCREENSHOTS.map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`thumb ${idx === hadesSlide ? "active" : ""}`}
                      onClick={() => setHadesSlide(idx)}
                    >
                      <img src={src} alt={`thumb ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* ПРАВА ЧАСТИНА — ІНФО ПРО ГРУ */}
              <div className="detail-right">
                <h1 className="detail-title">Hades</h1>
                <p className="detail-subtitle">
                  Roguelike • Action • Dungeon Crawler
                </p>

                <div className="detail-meta-row">
                  <div className="detail-rating-block">
                    <span className="detail-rating-label">Рейтинг гравців</span>
                    <span className="detail-rating-value">9.0 / 10</span>
                  </div>
                  <span className="detail-review-summary positive">
                    Подобається більшості користувачів
                  </span>
                </div>

                <p className="detail-description">
                  Hades — це динамічний roguelike-екшен, де ви в ролі сина Аїда
                  намагаєтесь вирватися з підземного світу, комбінуючи зброю,
                  здібності богів Олімпу та власну майстерність. Кожен забіг
                  відкриває нові діалоги, підсилення та випробування.
                </p>

                <div className="detail-developer">
                  <span className="dev-label">Продавець</span>
                  <div className="dev-info">
                    <span className="dev-name">Supergiant Games</span>
                    <span className="dev-badge">✔ Офіційний розробник</span>
                  </div>
                </div>

                <div className="detail-price-row">
                  <div>
                    <div className="detail-current-price">
                      {activeGame.price.toFixed(2)} $
                    </div>
                    <div className="detail-tax-note">
                      Цифровий ключ • Регіон: Global
                    </div>
                  </div>

                  <div className="detail-buttons">
                    <button
                      className="detail-buy-btn"
                      onClick={() => handleAddToCart(activeGame)}
                    >
                      Додати в кошик
                    </button>
                    <button className="detail-secondary-btn" type="button">
                      Пошукати дешевші пропозиції на маркеті
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          /* ================ ЗВИЧАЙНА ГОЛОВНА СТОРІНКА ================ */
          <div className="page-layout">
            <div className="catalog">
              <section className="hero">
                <h1>Магазин ігор</h1>
                <p>
                  Курсовий проєкт — Інформаційна система цифрової дистрибуції.
                </p>
              </section>

              <section className="filters">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Пошук ігор..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* ЖАНРИ */}
                <div className="sort-wrapper">
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => setIsGenreOpen((prev) => !prev)}
                  >
                    <span className="sort-label">Жанр</span>
                    <span className="sort-current">{selectedGenre}</span>
                    <span className={`sort-arrow ${isGenreOpen ? "open" : ""}`}>
                      ▾
                    </span>
                  </button>

                  {isGenreOpen && (
                    <div className="sort-dropdown">
                      {[
                        "Усі жанри",
                        "RPG",
                        "Action",
                        "Adventure",
                        "Action RPG",
                        "Roguelike",
                        "Sci-Fi RPG",
                        "Sandbox",
                      ].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setSelectedGenre(g);
                            setIsGenreOpen(false);
                          }}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* СОРТУВАННЯ */}
                <div className="sort-wrapper">
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => setIsSortOpen((prev) => !prev)}
                  >
                    <span className="sort-label">Сортування</span>
                    <span className="sort-current">
                      {sortOption === "popular"
                        ? "за замовчуванням"
                        : sortOption === "price-asc"
                        ? "ціна ↑"
                        : sortOption === "price-desc"
                        ? "ціна ↓"
                        : sortOption === "rating-desc"
                        ? "рейтинг ↓"
                        : "рейтинг ↑"}
                    </span>
                    <span className={`sort-arrow ${isSortOpen ? "open" : ""}`}>
                      ▾
                    </span>
                  </button>

                  {isSortOpen && (
                    <div className="sort-dropdown">
                      <button
                        type="button"
                        onClick={() => {
                          setSortOption("popular");
                          setIsSortOpen(false);
                        }}
                      >
                        За замовчуванням
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSortOption("price-asc");
                          setIsSortOpen(false);
                        }}
                      >
                        Ціна: зростання
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSortOption("price-desc");
                          setIsSortOpen(false);
                        }}
                      >
                        Ціна: спадання
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSortOption("rating-desc");
                          setIsSortOpen(false);
                        }}
                      >
                        Рейтинг: спочатку вищий
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSortOption("rating-asc");
                          setIsSortOpen(false);
                        }}
                      >
                        Рейтинг: спочатку нижчий
                      </button>
                    </div>
                  )}
                </div>
                <div className="favorites-toggle">
                  <label className="fav-switch">
                    <input
                      type="checkbox"
                      checked={showOnlyFavorites}
                      onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
                    />
                    <span className="slider"></span>
                  </label>

                  <span className="fav-switch-label">
                    Показати тільки улюблені
                  </span>
                </div>
              </section>

              <section className="games-grid">
                {visibleGames.map((game) => (
                  <article
                    key={game.id}
                    className="game-card"
                    onClick={() => handleCardClick(game)}
                  >
                    {!game.isUserLot && (
                      <button
                        className={`favorite-btn ${
                          favorites.includes(game.id) ? "active" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(game.id);
                        }}
                      >
                        <svg
                          className="heart-icon"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 
              19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                      </button>
                    )}

                    <div className="game-image-wrapper">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="game-image"
                      />
                    </div>

                    <div className="game-info">
                      <h2 className="game-title">{game.title}</h2>

                      <div className="game-info-row">
                        <p className="game-genre">{game.genre}</p>
                        {game.isUserLot && (
                          <span className="user-lot-badge">Ваш лот</span>
                        )}
                      </div>

                      {!game.isUserLot ? (
                        <p className="game-rating">Рейтинг: {game.rating}</p>
                      ) : null}
                    </div>

                    <div className="game-footer">
                      <span className="game-price">
                        {game.price.toFixed(2)} $
                      </span>

                      {game.isUserLot ? (
                        <span className="lot-status">Лот на модерації</span>
                      ) : (
                        <button
                          className="buy-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(game);
                          }}
                        >
                          Додати в кошик
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Модалка реєстрації */}
      {isSignupOpen && (
        <div className="modal-backdrop" onClick={() => setIsSignupOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsSignupOpen(false)}
            >
              ✕
            </button>

            <h2 className="modal-title">Реєстрація</h2>
            <p className="modal-subtitle">
              Створи акаунт, щоб додавати ігри в бібліотеку та обране.
            </p>

            <form className="modal-form" onSubmit={handleSignupSubmit}>
              <div className="modal-field">
                <label>Нікнейм</label>
                <input
                  type="text"
                  placeholder="Введіть ваш нікнейм"
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  required
                />
              </div>

              <div className="modal-field">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" />
              </div>

              <div className="modal-field">
                <label>Пароль</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <div className="modal-field">
                <label>Підтвердження пароля</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <div className="modal-checkbox">
                <input id="terms" type="checkbox" />
                <label htmlFor="terms">
                  Я погоджуюсь з умовами використання платформи.
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="modal-primary-btn">
                  Зареєструватися
                </button>
                <button
                  type="button"
                  className="modal-secondary-btn"
                  onClick={() => setIsSignupOpen(false)}
                >
                  Скасувати
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST для незареєстрованих */}
      {showRegisterWarning && (
        <div className="warning-toast">Спочатку потрібно зареєструватися!</div>
      )}

      {/* Модалка профілю */}
      {isAccountOpen && user && (
        <div className="modal-backdrop" onClick={() => setIsAccountOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsAccountOpen(false)}
            >
              ✕
            </button>

            <h2 className="modal-title">Профіль</h2>
            <p className="modal-subtitle">
              Ви увійшли як <strong>{user.nickname}</strong>.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={handleLogout}
              >
                Вийти з акаунта
              </button>
            </div>
          </div>
        </div>
      )}

      {/* КОШИК SIDEBAR */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-sidebar-header">
          <h2>Кошик</h2>
          <button
            className="close-cart-btn"
            onClick={() => {
              setIsCartOpen(false);
              setIsSortOpen(false);
              setIsGenreOpen(false);
            }}
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Кошик порожній</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-main">
                    <span className="cart-item-title">{item.title}</span>
                    <span className="cart-item-genre">{item.genre}</span>

                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </div>

                  <div className="cart-item-meta">
                    <span className="cart-item-price">
                      {(item.price * item.quantity).toFixed(2)} $
                    </span>
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Товарів:</span>
                <span>{cartCount}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Сума:</span>
                <span>{cartTotal.toFixed(2)} $</span>
              </div>
              <button className="cart-checkout-btn">Оформити замовлення</button>
            </div>
          </>
        )}
      </div>

      {/* Модалка створення лота */}
      {isCreateLotOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsCreateLotOpen(false)}
        >
          <div
            className="modal modal-wide"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsCreateLotOpen(false)}
            >
              ✕
            </button>

            <h2 className="modal-title">Створити лот</h2>
            <p className="modal-subtitle">
              Додайте цифрову гру для продажу. Лот буде відправлено на
              модерацію.
            </p>

            <form className="modal-form" onSubmit={handleCreateLotSubmit}>
              <div className="modal-field">
                <label>Офіційна назва гри</label>
                <input
                  type="text"
                  placeholder="Наприклад: Elden Ring"
                  value={lotTitle}
                  onChange={(e) => setLotTitle(e.target.value)}
                  required
                />
              </div>

              <div className="modal-field">
                <label>Картинки гри (посилання, кожне з нового рядка)</label>
                <textarea
                  rows={3}
                  placeholder="https://...&#10;https://..."
                  value={lotImages}
                  onChange={(e) => setLotImages(e.target.value)}
                />
              </div>

              <div className="modal-field">
                <label>Опис</label>
                <textarea
                  rows={4}
                  placeholder="Опишіть, що входить у лот, регіон ключа, особливі умови..."
                  value={lotDescription}
                  onChange={(e) => setLotDescription(e.target.value)}
                />
              </div>

              <div className="modal-field">
                <label>Офіційний ключ гри (як у Steam)</label>
                <input
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  maxLength={19}
                  value={lotKey}
                  onChange={(e) => setLotKey(formatGameKey(e.target.value))}
                  required
                />
              </div>

              <div className="modal-row">
                <div className="modal-field">
                  <label>Жанр</label>
                  <select
                    value={lotGenre}
                    onChange={(e) => setLotGenre(e.target.value)}
                  >
                    <option>RPG</option>
                    <option>Action</option>
                    <option>Adventure</option>
                    <option>Action RPG</option>
                    <option>Roguelike</option>
                    <option>Sci-Fi RPG</option>
                    <option>Sandbox</option>
                  </select>
                </div>

                <div className="modal-field">
                  <label>Ціна за лот ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Наприклад: 19.99"
                    value={lotPrice}
                    onChange={(e) => setLotPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="modal-primary-btn wide">
                  Створити лот та відправити на модерацію
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {easterEggVisible && (
        <div className="egg-overlay" onClick={() => setEasterEggVisible(false)}>
          <img src="/egg-image.png" className="egg-image" alt="Easter Egg" />
        </div>
      )}

      <footer className="footer">
        <p>© {new Date().getFullYear()} 420XP — курсовий проєкт</p>
        <p>Інформаційна система цифрової дистрибуції. Пшик Маркіян СА-31</p>
      </footer>
    </div>
  );
}

export default App;
