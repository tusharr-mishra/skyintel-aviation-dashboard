/*
   Contents:
   1.  App Data (flights, weather, news, insights, predictions)
   2.  Loading Sequence
   3.  Navigation (scroll, active links, hamburger)
   4.  Theme Toggle (dark / light, local storage)
   5.  Hero Animations (counter, plane dots)
   6.  Ticker Bar
   7.  Live Flights Dashboard (render, search, filter)
   8.  Airport Weather Intelligence
   9.  AI Delay Prediction Engine
   10. Aviation Analytics (stat cards, bar charts, donut chart)
   11. Aviation News Section
   12. AI Insights Feed (categories, filter)
   13. Footer clock
   14. Scroll-to-top button
   15. Init
 */

'use strict';

/* ============================================================
   1. APPLICATION DATA
============================================================ */

/* These are the data selected manually/ on will by user and just written over here and is dynamically brought to the HTML layout by JS as it only shows frontend */

/** @type {Array<Object>} Flight data records */
const FLIGHTS = [
  { id: 'AI-202',  airline: 'Air India',        from: 'DEL', fromCity: 'New Delhi',    to: 'BOM', toCity: 'Mumbai',      dep: '06:45', arr: '08:55', status: 'on-time',   delay: 0,  aircraft: 'A320neo' },
  { id: 'EK-508',  airline: 'Emirates',          from: 'DXB', fromCity: 'Dubai',        to: 'JFK', toCity: 'New York',    dep: '08:30', arr: '14:15', status: 'delayed',   delay: 45, aircraft: 'B777-300ER' },
  { id: 'BA-117',  airline: 'British Airways',   from: 'LHR', fromCity: 'London',       to: 'JFK', toCity: 'New York',    dep: '11:00', arr: '14:00', status: 'boarding',  delay: 0,  aircraft: 'B787-9' },
  { id: 'SQ-421',  airline: 'Singapore Air',     from: 'SIN', fromCity: 'Singapore',    to: 'SYD', toCity: 'Sydney',      dep: '07:20', arr: '16:40', status: 'on-time',   delay: 0,  aircraft: 'A380' },
  { id: 'LH-400',  airline: 'Lufthansa',         from: 'FRA', fromCity: 'Frankfurt',    to: 'ORD', toCity: 'Chicago',     dep: '13:15', arr: '16:30', status: 'delayed',   delay: 30, aircraft: 'A340-600' },
  { id: '6E-812',  airline: 'IndiGo',            from: 'BOM', fromCity: 'Mumbai',       to: 'BLR', toCity: 'Bengaluru',   dep: '09:10', arr: '10:30', status: 'on-time',   delay: 0,  aircraft: 'A320' },
  { id: 'AF-064',  airline: 'Air France',        from: 'CDG', fromCity: 'Paris',        to: 'DEL', toCity: 'New Delhi',   dep: '22:30', arr: '10:15', status: 'departed',  delay: 0,  aircraft: 'B777-200ER' },
  { id: 'QR-556',  airline: 'Qatar Airways',     from: 'DOH', fromCity: 'Doha',         to: 'SIN', toCity: 'Singapore',   dep: '03:00', arr: '14:25', status: 'on-time',   delay: 0,  aircraft: 'A350-900' },
  { id: 'UA-232',  airline: 'United Airlines',   from: 'ORD', fromCity: 'Chicago',      to: 'LAX', toCity: 'Los Angeles', dep: '10:45', arr: '13:05', status: 'cancelled', delay: 0,  aircraft: 'B737 MAX' },
  { id: 'DL-420',  airline: 'Delta Airlines',    from: 'ATL', fromCity: 'Atlanta',      to: 'JFK', toCity: 'New York',    dep: '07:00', arr: '10:22', status: 'on-time',   delay: 0,  aircraft: 'B767-300' },
  { id: '9W-118',  airline: 'Jet Airways',       from: 'DEL', fromCity: 'New Delhi',    to: 'LHR', toCity: 'London',      dep: '14:20', arr: '18:45', status: 'delayed',   delay: 90, aircraft: 'B737-800' },
  { id: 'TK-012',  airline: 'Turkish Airlines',  from: 'IST', fromCity: 'Istanbul',     to: 'JFK', toCity: 'New York',    dep: '01:15', arr: '06:40', status: 'landed',    delay: 0,  aircraft: 'B777-300ER' },
  { id: 'MH-003',  airline: 'Malaysia Airlines', from: 'KUL', fromCity: 'Kuala Lumpur', to: 'LHR', toCity: 'London',      dep: '23:55', arr: '05:30', status: 'boarding',  delay: 0,  aircraft: 'A350-900XWB' },
  { id: 'NH-839',  airline: 'ANA',               from: 'NRT', fromCity: 'Tokyo',        to: 'LAX', toCity: 'Los Angeles', dep: '11:30', arr: '06:50', status: 'on-time',   delay: 0,  aircraft: 'B787-9 Dreamliner' },
  { id: 'CX-251',  airline: 'Cathay Pacific',    from: 'HKG', fromCity: 'Hong Kong',    to: 'SFO', toCity: 'San Francisco', dep: '00:20', arr: '20:15', status: 'on-time', delay: 0,  aircraft: 'B777-300ER' },
  { id: 'AA-100',  airline: 'American Airlines', from: 'JFK', fromCity: 'New York',     to: 'LHR', toCity: 'London',      dep: '22:10', arr: '10:25', status: 'delayed',   delay: 20, aircraft: 'B777-200ER' },
];

/** @type {Array<Object>} Airport weather records */
const WEATHER_DATA = [
  { code: 'DEL', city: 'New Delhi',     temp: 38, condition: 'Partly Cloudy',   wind: 28, visibility: 7,  humidity: 52, icon: '⛅', alert: 'Dust advisory in effect', color: 'rgba(255,150,50,0.3)' },
  { code: 'BOM', city: 'Mumbai',        temp: 32, condition: 'Heavy Rain',      wind: 45, visibility: 3,  humidity: 89, icon: '⛈', alert: 'Low visibility alert',    color: 'rgba(100,150,255,0.3)' },
  { code: 'JFK', city: 'New York',      temp: 18, condition: 'Clear',           wind: 14, visibility: 16, humidity: 45, icon: '☀', alert: null,                     color: 'rgba(255,220,50,0.2)' },
  { code: 'LHR', city: 'London',        temp: 12, condition: 'Overcast / Fog',  wind: 22, visibility: 2,  humidity: 91, icon: '🌫', alert: 'Fog warning: low viz',    color: 'rgba(200,200,220,0.2)' },
  { code: 'DXB', city: 'Dubai',         temp: 44, condition: 'Clear / Hot',     wind: 18, visibility: 20, humidity: 38, icon: '🌤', alert: 'Extreme heat advisory',   color: 'rgba(255,180,30,0.3)' },
  { code: 'SIN', city: 'Singapore',     temp: 30, condition: 'Thunderstorm',    wind: 60, visibility: 4,  humidity: 94, icon: '🌩', alert: 'Severe thunderstorm',     color: 'rgba(80,100,200,0.3)' },
  { code: 'FRA', city: 'Frankfurt',     temp: 9,  condition: 'Light Rain',      wind: 32, visibility: 8,  humidity: 78, icon: '🌧', alert: null,                     color: 'rgba(100,160,220,0.2)' },
  { code: 'CDG', city: 'Paris',         temp: 14, condition: 'Partly Cloudy',   wind: 20, visibility: 12, humidity: 65, icon: '⛅', alert: null,                     color: 'rgba(140,180,220,0.2)' },
];

/** @type {Array<Object>} Pre-computed prediction records */
const PREDICTIONS_DATA = [
  { id: 'EK-508', route: 'DXB → JFK', risk: 'high',   score: 82, reason: 'Severe crosswinds at JFK (58 km/h). High traffic congestion. Weather front approaching.', weather: 'thunderstorm', wind: 58 },
  { id: 'AI-202', route: 'DEL → BOM', risk: 'medium', score: 48, reason: 'Dust advisory at DEL. Moderate traffic load. Monsoon activity near arrival.', weather: 'fog', wind: 28 },
  { id: 'BA-117', route: 'LHR → JFK', risk: 'low',    score: 18, reason: 'Minor fog at LHR clearing by departure. Normal traffic. Favorable winds en route.', weather: 'fog', wind: 22 },
  { id: 'SQ-421', route: 'SIN → SYD', risk: 'high',   score: 76, reason: 'Active thunderstorm at SIN. Severe turbulence alerts. Peak departure slots.', weather: 'heavy_rain', wind: 60 },
  { id: 'LH-400', route: 'FRA → ORD', risk: 'medium', score: 55, reason: 'Persistent rainfall at FRA. Ground delays possible. ORD high traffic period.', weather: 'rain', wind: 32 },
  { id: 'DL-420', route: 'ATL → JFK', risk: 'low',    score: 12, reason: 'Clear conditions at both airports. Low wind speeds. On-time probability: 97%.', weather: 'clear', wind: 10 },
];

/** @type {Array<Object>} Aviation news articles */
const NEWS_DATA = [
  {
    category: 'SAFETY ALERT',
    title: 'ICAO Issues New Wake Turbulence Separation Standards for A380 Operations',
    excerpt: 'The International Civil Aviation Organization has updated wake turbulence separation minima for A380 departures at congested hub airports to reduce the risk of incidents.',
    time: '2 hours ago',
    source: 'ICAO',
    icon: '✈',
    gradient: 'linear-gradient(135deg, #0a1f35, #0d2a4a)',
  },
  {
    category: 'WEATHER ADVISORY',
    title: 'Monsoon Activity Causes Mass Delays Across South Asian Airports',
    excerpt: 'Heavy monsoon rainfall is causing widespread visibility restrictions and ground delays at major South Asian hubs including Mumbai, Delhi, and Kolkata this week.',
    time: '4 hours ago',
    source: 'METAR',
    icon: '⛈',
    gradient: 'linear-gradient(135deg, #0a1a35, #1a0a35)',
  },
  {
    category: 'TECHNOLOGY',
    title: 'EUROCONTROL Deploys AI-Powered Flow Management System Across European Airspace',
    excerpt: 'EUROCONTROL\'s new AI flow management system is now live, using machine learning to dynamically adjust sector capacity and reduce holding fuel burn by up to 22%.',
    time: '6 hours ago',
    source: 'EUROCONTROL',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #0d2040, #050f1f)',
  },
  {
    category: 'OPERATIONS',
    title: 'FAA Implements Revised EDCT Procedures for JFK and LAX High-Traffic Periods',
    excerpt: 'The FAA has rolled out revised Expected Departure Clearance Times at JFK and LAX to improve ground stop efficiency during peak summer travel season.',
    time: '8 hours ago',
    source: 'FAA',
    icon: '🗽',
    gradient: 'linear-gradient(135deg, #1a0d30, #0a0520)',
  },
  {
    category: 'INCIDENT REPORT',
    title: 'Bird Strike Incident at Frankfurt Airport Prompts Runway Inspection',
    excerpt: 'A bird strike incident during landing roll led to a precautionary runway closure at FRA for 40 minutes. Operations have resumed with minimal impact to departures.',
    time: '10 hours ago',
    source: 'DFS Germany',
    icon: '🦅',
    gradient: 'linear-gradient(135deg, #0a1f0a, #050f0a)',
  },
  {
    category: 'INDUSTRY NEWS',
    title: 'Emirates Orders 30 Additional A350-900 Aircraft for Long-Haul Network Expansion',
    excerpt: 'Emirates has placed a firm order for 30 Airbus A350-900 aircraft as part of its strategy to modernize its long-haul fleet with more fuel-efficient widebody jets.',
    time: '14 hours ago',
    source: 'Airbus',
    icon: '🛫',
    gradient: 'linear-gradient(135deg, #1a1a0a, #0f0f05)',
  },
];

/** @type {Array<Object>} AI insight records */
const INSIGHTS_DATA = [
  {
    cat: 'weather',
    severity: 'critical',
    icon: '⛈',
    title: 'Thunderstorm Disruption — Singapore Changi (SIN)',
    text: 'Active severe thunderstorm cells detected over SIN. Estimated 14 departures affected with ground stop in effect. Recommend issuing DCMs for SIN-bound traffic. Delay probability elevated to 94% for next 3-hour block.',
    time: '2 min ago',
    tags: ['SIN', 'GROUND STOP', 'THUNDERSTORM'],
  },
  {
    cat: 'weather',
    severity: 'warning',
    icon: '🌫',
    title: 'Fog Advisory — London Heathrow (LHR)',
    text: 'CAT II/III ILS approaches in use at LHR due to visibility below 400m. Estimated 30% capacity reduction. 8 arrivals currently in holding stack. Expect ground delays of 25–40 minutes for flights to LHR.',
    time: '7 min ago',
    tags: ['LHR', 'FOG', 'CAT III'],
  },
  {
    cat: 'delay',
    severity: 'warning',
    icon: '⏱',
    title: 'Propagated Delay Alert — Flight EK-508',
    text: 'EK-508 (DXB→JFK) is currently 45 minutes behind schedule due to late inbound aircraft from BKK. Downstream connections at JFK: 7 passengers at risk of missing onward flights. Recommend passenger rebooking evaluation.',
    time: '12 min ago',
    tags: ['EK-508', 'PROPAGATED DELAY', 'JFK'],
  },
  {
    cat: 'traffic',
    severity: 'info',
    icon: '📊',
    title: 'Peak Traffic Window — Delhi Indira Gandhi (DEL)',
    text: 'DEL is entering its 08:00–10:00 peak departure window with 42 scheduled departures. Current runway throughput at 92% capacity. Minor taxi congestion expected. Average ATFM delay: 8 minutes.',
    time: '18 min ago',
    tags: ['DEL', 'PEAK TRAFFIC', 'ATFM'],
  },
  {
    cat: 'advisory',
    severity: 'info',
    icon: '📢',
    title: 'NOTAM — Dubai International (DXB) Runway Maintenance',
    text: 'Runway 30L at DXB closed 00:00–04:00 UTC daily for resurfacing works. Single runway operations during maintenance window. Expect 15–20% capacity reduction overnight. All long-haul departures affected.',
    time: '35 min ago',
    tags: ['DXB', 'NOTAM', 'RUNWAY CLOSURE'],
  },
  {
    cat: 'weather',
    severity: 'warning',
    icon: '🌡',
    title: 'Extreme Heat Alert — Dubai (DXB)',
    text: 'Surface temperature at DXB reaching 44°C. Performance calculations required for all heavy aircraft. Possible MTOW restrictions for long-haul departures. B777 and A380 aircraft may require payload reduction or fuel tankering adjustments.',
    time: '1 hr ago',
    tags: ['DXB', 'EXTREME HEAT', 'PERFORMANCE'],
  },
  {
    cat: 'delay',
    severity: 'critical',
    icon: '❌',
    title: 'Cancellation Wave — Chicago O\'Hare (ORD)',
    text: 'United Airlines has cancelled 6 regional flights from ORD due to crew scheduling issues. Domino effect expected across the hub network. Downstream delay probability for ORD arrivals increased by 38% over next 4 hours.',
    time: '1 hr 20 min ago',
    tags: ['ORD', 'CANCELLATIONS', 'CREW'],
  },
  {
    cat: 'traffic',
    severity: 'success',
    icon: '✅',
    title: 'Efficiency Improvement — Frankfurt (FRA)',
    text: 'FRA has achieved a 96.2% on-time departure rate this morning despite reduced capacity from rain. Coordinated push-back scheduling has reduced average taxi time by 6 minutes. CDMFRA initiative showing strong results.',
    time: '2 hrs ago',
    tags: ['FRA', 'CDM', 'ON-TIME'],
  },
  {
    cat: 'advisory',
    severity: 'info',
    icon: '🌐',
    title: 'Airspace Restriction — Eastern Mediterranean',
    text: 'Temporary airspace restriction active over Eastern Mediterranean (FL200–FL350) due to military exercise. ATC routing aircraft via alternative waypoints adding 15–25 minutes to affected routes. Fuel contingency recommended.',
    time: '3 hrs ago',
    tags: ['AIRSPACE', 'TFR', 'ROUTING'],
  },
];

/** @type {Array<Object>} Analytics stat cards */
const ANALYTICS_STATS = [
  { icon: '✈', value: '2,847', label: 'Active Flights',       delta: '+124 vs yesterday',   dir: 'up',   color: 'var(--accent)' },
  { icon: '✅', value: '94.2%', label: 'On-Time Performance', delta: '+1.3% vs last week',   dir: 'up',   color: 'var(--success)' },
  { icon: '⏱', value: '312',   label: 'Flights Delayed',      delta: '-18 vs yesterday',    dir: 'down', color: 'var(--warning)' },
  { icon: '❌', value: '29',    label: 'Cancellations Today',  delta: '+7 vs yesterday',     dir: 'down', color: 'var(--danger)' },
  { icon: '🌍', value: '187',   label: 'Airports Monitored',   delta: 'Global coverage',     dir: 'up',   color: '#9b59b6' },
  { icon: '⚠', value: '14',    label: 'Active Weather Alerts', delta: 'Updated 5 min ago',  dir: 'up',   color: 'var(--warning)' },
  { icon: '⛽', value: '4.2t',  label: 'Avg Delay Fuel Cost',  delta: 'Per affected flight', dir: 'up',   color: '#e67e22' },
  { icon: '🛬', value: '98.1%', label: 'Landing Success Rate', delta: 'All weather conditions', dir: 'up', color: 'var(--success)' },
];

/** @type {Array<Object>} Airline on-time performance data */
const AIRLINE_PERF = [
  { name: 'ANA',              pct: 96.4 },
  { name: 'Singapore Air',    pct: 94.8 },
  { name: 'Delta Airlines',   pct: 93.7 },
  { name: 'Emirates',         pct: 91.2 },
  { name: 'British Airways',  pct: 90.5 },
  { name: 'Air India',        pct: 88.3 },
  { name: 'Lufthansa',        pct: 87.9 },
  { name: 'United Airlines',  pct: 82.1 },
];

/** @type {Array<Object>} Delay causes for donut chart */
const DELAY_CAUSES = [
  { label: 'Weather',             pct: 38, color: '#00a8ff' },
  { label: 'Air Traffic Control', pct: 24, color: '#ffb347' },
  { label: 'Aircraft / Technical', pct: 18, color: '#ff4757' },
  { label: 'Late Aircraft',       pct: 12, color: '#9b59b6' },
  { label: 'Crew / Scheduling',   pct: 8,  color: '#00d68f' },
];

/** @type {Array<Object>} Busiest airports data */
const BUSY_AIRPORTS = [
  { name: 'ATL — Hartsfield-Jackson', flights: 2640 },
  { name: 'ORD — Chicago O\'Hare',    flights: 2430 },
  { name: 'DFW — Dallas Fort Worth',  flights: 2290 },
  { name: 'DEN — Denver International', flights: 2110 },
  { name: 'LAX — Los Angeles',        flights: 2080 },
  { name: 'JFK — New York',           flights: 1950 },
  { name: 'LHR — London Heathrow',    flights: 1870 },
  { name: 'DXB — Dubai International', flights: 1740 },
  { name: 'CDG — Paris Charles de Gaulle', flights: 1620 },
  { name: 'DEL — Indira Gandhi Intl', flights: 1590 },
];

/* Ticker data */
const TICKER_ITEMS = [
  { flight: 'AI-202', route: 'DEL→BOM', status: 'On Time', cls: 'on-time' },
  { flight: 'EK-508', route: 'DXB→JFK', status: 'Delayed 45min', cls: 'delayed' },
  { flight: 'BA-117', route: 'LHR→JFK', status: 'Now Boarding', cls: 'on-time' },
  { flight: 'UA-232', route: 'ORD→LAX', status: 'CANCELLED', cls: 'cancelled' },
  { flight: 'LH-400', route: 'FRA→ORD', status: 'Delayed 30min', cls: 'delayed' },
  { flight: 'SQ-421', route: 'SIN→SYD', status: 'On Time', cls: 'on-time' },
  { flight: 'QR-556', route: 'DOH→SIN', status: 'On Time', cls: 'on-time' },
  { flight: 'TK-012', route: 'IST→JFK', status: 'Landed', cls: 'on-time' },
  { flight: '9W-118', route: 'DEL→LHR', status: 'Delayed 90min', cls: 'delayed' },
  { flight: 'MH-003', route: 'KUL→LHR', status: 'Now Boarding', cls: 'on-time' },
];

/* ============================================================
   2. LOADING SEQUENCE (ENTERING THE WEBSITE ONCE CLICKED)
============================================================ */

/**
 * Simulates a system loading sequence with progress bar animation.
 * Removes overlay when complete.
 */
function initLoadingSequence() {
  const overlay = document.getElementById('loadingOverlay');
  const progress = document.getElementById('loadingProgress');
  const status = document.getElementById('loadingStatus');

  const steps = [
    { pct: 15, msg: 'Connecting to flight data feeds...' },
    { pct: 30, msg: 'Loading weather intelligence...' },
    { pct: 50, msg: 'Initializing AI prediction engine...' },
    { pct: 70, msg: 'Fetching airport data...' },
    { pct: 88, msg: 'Calibrating analytics dashboard...' },
    { pct: 100, msg: 'Systems ready. Welcome to SkyIntel.' },
  ];

  let i = 0;
  const tick = () => {
    if (i >= steps.length) {
      setTimeout(() => overlay.classList.add('hidden'), 400);
      return;
    }
    progress.style.width = steps[i].pct + '%';
    status.textContent = steps[i].msg;
    i++;
    setTimeout(tick, 420);
  };

  setTimeout(tick, 300);
}

/* ============================================================
   3. NAVIGATION
============================================================ */

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const allLinks = navLinks.querySelectorAll('.nav-link');

  // Scroll: add shadow + active link highlighting
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);     
    updateActiveLink();                                         
  }, { passive: true });

  /* Hamburger toggle, .toggle() function is used in JS toggles between hide() and show() for the selected elements. This method checks the selected elements for visibility. show() is run if an element is hidden. hide() is run if an element is visible */
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');                                      // convetrs hamburger menu to X       
    navLinks.classList.toggle('open');                                      // shows the list of options in navbar out of the screen to user
  });

  // Close menu when a link is clicked
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');                                 // convets X back to hamburger menu asap any link is selected
      navLinks.classList.remove('open');                                 // .remove() is clearing the list of options asap a link is selected.
    });
  });
}

/* Highlights the nav link corresponding to the currently visible section. */

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');

/* Without offset of +100, the highlighting would appear too slow & choice of 100 is completely upon the user; it's just a standard practice.
  scrollY = where user currently is vertically, offsetTop = where top sections begin, offsetHeight = the section size and bottom = where section ends */

  const scrollY = window.scrollY + 100; 
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;                                                                // Provided it's a broken/non-existent link, return it - preventing errors 
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    link.classList.toggle('active', scrollY >= top && scrollY < bottom);            // to make sure it is in the middle (crossed top and under bottom parts)
  });
}

/* ============================================================
   4. THEME TOGGLE
============================================================ */

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  // Retrieve saved preference or default to dark, browser still remembers even after refreshing; { || dark } ---> if nothing's here and then make it dark
  const saved = localStorage.getItem('skyintel-theme') || 'dark';                  
  document.documentElement.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);                    // document.documentElement is <html> element and here next changes the mode
    localStorage.setItem('skyintel-theme', next);                                // next ensures to remember the changed theme and save it in memory unless otherwise
  });           
}

/* ============================================================
   5. HERO ANIMATIONS
============================================================ */

/**
 * Animates a number from 0 up to its target value.
 * @param {HTMLElement} el  - element with data-target attribute
 */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);                                               // parseInt() converts String back to Number 
  const duration = 2000; // ms
  const step = Math.ceil(duration / target);                                                    
  let current = 0;

  const interval = setInterval(() => {                                                       // setInterval() --> repeats the code again and again
    current += Math.ceil(target / 60);
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(interval);                                                             // stop repeating the loop 
    } else {
      el.textContent = current.toLocaleString();                                          // .toLocaleString() formats number properly like 2,000 instead of 2000
    }
  }, step);
}

function initHeroAnimations() {
  // Trigger counters when hero is visible
  const observer = new IntersectionObserver(entries => {                            // IntersectionObserver --> when the particular section is visible on user screen
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(animateCounter);
        observer.disconnect();                                                     // stops the animation after one time show 
      }
    });
  }, { threshold: 0.3 });                                                         // threshold : 30% visibility leads to counter start 

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

/* ============================================================
   6. TICKER BAR
============================================================ */

function initTickerBar() {
  const track = document.getElementById('tickerTrack');
  // Duplicate items for seamless looping
  const allItems = [...TICKER_ITEMS, ...TICKER_ITEMS];                    // ... --> spread operator --> used to spread the array items to be filled dynamically by JS
                                                                         //  ----> used to create duplicacy, like [1,2,3]  --> [1,2,3,1,2,3]
  track.innerHTML = allItems.map(item => `
    <span class="ticker-item">
      <span class="t-flight">${item.flight}</span>
      <span>${item.route}</span>
      <span class="t-status ${item.cls}">${item.status}</span>
      <span style="color:var(--border-accent)">|</span>
    </span>
  `).join('');                                                            // .join() to create one clean HTML String
}

/* ============================================================
   7. LIVE FLIGHTS DASHBOARD
============================================================ */

/* Current filter state for UI Memory to store it */
const flightState = {
  filter: 'all',
  search: '',
};

/*
  Returns CSS class and --status-color for a given status string.
 */
function getStatusStyles(status) {
  const map = {
    'on-time':   { cls: 'badge-on-time',   color: 'var(--success)' },
    'delayed':   { cls: 'badge-delayed',   color: 'var(--warning)' },
    'boarding':  { cls: 'badge-boarding',  color: 'var(--accent)'  },
    'cancelled': { cls: 'badge-cancelled', color: 'var(--danger)'  },
    'landed':    { cls: 'badge-landed',    color: 'var(--info)'    },
    'departed':  { cls: 'badge-departed',  color: '#74b9ff'         },
  };
  return map[status] || { cls: 'badge-on-time', color: 'var(--accent)' };       // On the basis of map[status], give particular styling from CSS class
}

/*
  Renders flight cards into #flightsGrid based on current filter/search state.
 */
function renderFlights() {
  const grid = document.getElementById('flightsGrid');
  const { filter, search } = flightState;                                         // Object destructuring, to directly give data stored on those 2 fields 

  const filtered = FLIGHTS.filter(f => {
    const matchFilter = filter === 'all' || f.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      f.id.toLowerCase().includes(q) ||
      f.airline.toLowerCase().includes(q) ||
      f.from.toLowerCase().includes(q) ||
      f.to.toLowerCase().includes(q) ||
      f.fromCity.toLowerCase().includes(q) ||
      f.toCity.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);font-family:var(--font-mono);font-size:0.85rem;">
        No flights match your search criteria.
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((f, i) => {
    const { cls, color } = getStatusStyles(f.status);
    const label = f.status.replace('-', ' ').toUpperCase();
    const delayText = f.delay > 0 ? `<span>+${f.delay} min delay</span>` : '<span style="color:var(--success)">On Schedule</span>';
    return `
      <article class="flight-card" style="--status-color:${color};animation-delay:${i * 0.05}s">
        <div class="flight-card-header">
          <div>
            <div class="flight-number">${f.id}</div>
            <div class="flight-airline">${f.airline}</div>
          </div>
          <span class="flight-status-badge ${cls}">${label}</span>
        </div>
        <div class="flight-route">
          <div class="route-city">
            <div class="city-code">${f.from}</div>
            <div class="city-name">${f.fromCity}</div>
          </div>
          <div class="route-arrow">
            <div class="arrow-line"></div>
            <div class="arrow-plane">✈</div>
          </div>
          <div class="route-city">
            <div class="city-code">${f.to}</div>
            <div class="city-name">${f.toCity}</div>
          </div>
        </div>
        <div class="flight-times">
          <div class="time-block">
            <div class="time-label">Departure</div>
            <div class="time-value">${f.dep}</div>
          </div>
          <div style="color:var(--text-muted);font-size:1.2rem;">→</div>
          <div class="time-block">
            <div class="time-label">Arrival</div>
            <div class="time-value">${f.arr}</div>
          </div>
        </div>
        <div class="flight-card-footer">
          <div class="delay-tag">${delayText}</div>
          <div class="flight-aircraft">${f.aircraft}</div>
        </div>
      </article>`;
  }).join('');
}

function initFlightsDashboard() {
  renderFlights();

  // Search
  document.getElementById('flightSearch').addEventListener('input', e => {
    flightState.search = e.target.value;
    renderFlights();
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      flightState.filter = btn.dataset.filter;
      renderFlights();
    });
  });
}

/* ============================================================
   8. AIRPORT WEATHER INTELLIGENCE
============================================================ */

function renderWeather() {
  const grid = document.getElementById('weatherGrid');
  grid.innerHTML = WEATHER_DATA.map((w, i) => `
    <article class="weather-card" style="--wc-color:${w.color};animation-delay:${i * 0.07}s">
      <div class="weather-card-header">
        <div>
          <div class="weather-airport">${w.code}</div>
          <div class="weather-city">${w.city}</div>
        </div>
        <div class="weather-icon">${w.icon}</div>
      </div>
      <div class="weather-temp">${w.temp}°C</div>
      <div class="weather-condition">${w.condition}</div>
      <div class="weather-details">
        <div class="weather-detail-item">
          <div class="wd-label">Wind</div>
          <div class="wd-value">${w.wind} km/h</div>
        </div>
        <div class="weather-detail-item">
          <div class="wd-label">Visibility</div>
          <div class="wd-value">${w.visibility} km</div>
        </div>
        <div class="weather-detail-item">
          <div class="wd-label">Humidity</div>
          <div class="wd-value">${w.humidity}%</div>
        </div>
        <div class="weather-detail-item">
          <div class="wd-label">Condition</div>
          <div class="wd-value" style="font-size:0.75rem">${w.condition.split(' ')[0]}</div>
        </div>
      </div>
      ${w.alert ? `
      <div class="weather-alert">
        <span>⚠</span>
        <span>${w.alert}</span>
      </div>` : ''}
    </article>
  `).join('');
}

/* ============================================================
   9. AI DELAY PREDICTION ENGINE
============================================================ */

/**
 * Rule-based delay prediction engine.
 * Returns { score: number, risk: string, factors: Array, recommendation: string }
 */
function runPredictionEngine({ weather, wind, traffic }) {
  let score = 0;
  const factors = [];

  // Weather scoring
  const weatherScores = {
    clear:       { pts: 2,  label: 'Clear conditions',          impact: 'low'    },
    cloudy:      { pts: 8,  label: 'Overcast / cloudy skies',   impact: 'low'    },
    fog:         { pts: 35, label: 'Fog / low visibility',       impact: 'high'   },
    rain:        { pts: 22, label: 'Rain activity',              impact: 'medium' },
    heavy_rain:  { pts: 52, label: 'Heavy rain / thunderstorm',  impact: 'high'   },
    snow:        { pts: 40, label: 'Snow conditions',            impact: 'high'   },
    blizzard:    { pts: 72, label: 'Blizzard / severe snow',     impact: 'high'   },
  };

  const wData = weatherScores[weather] || weatherScores.clear;
  score += wData.pts;
  factors.push({ icon: '🌤', text: wData.label, impact: wData.impact });

  // Wind scoring
  const windN = parseInt(wind, 10) || 0;
  if (windN > 70) {
    score += 30;
    factors.push({ icon: '💨', text: `Very strong winds: ${windN} km/h (exceeds limits)`, impact: 'high' });
  } else if (windN > 50) {
    score += 18;
    factors.push({ icon: '💨', text: `Strong crosswinds: ${windN} km/h`, impact: 'high' });
  } else if (windN > 30) {
    score += 8;
    factors.push({ icon: '💨', text: `Moderate winds: ${windN} km/h`, impact: 'medium' });
  } else {
    score += 2;
    factors.push({ icon: '💨', text: `Calm winds: ${windN} km/h`, impact: 'low' });
  }

  // Traffic scoring
  const trafficScores = { low: 2, medium: 10, high: 20, peak: 35 };
  const trafficLabels = {
    low:    { label: 'Low traffic volume',        impact: 'low'    },
    medium: { label: 'Moderate traffic load',     impact: 'low'    },
    high:   { label: 'High traffic density',      impact: 'medium' },
    peak:   { label: 'Peak / overcrowded slots',  impact: 'high'   },
  };
  score += trafficScores[traffic] || 5;
  const td = trafficLabels[traffic] || trafficLabels.medium;
  factors.push({ icon: '🛫', text: td.label, impact: td.impact });

  // Clamp score
  score = Math.min(score, 99);

  // Risk level
  let risk, recommendation;
  if (score >= 60) {
    risk = 'high';
    recommendation = `⚠ HIGH RISK: Significant delay probability. Recommend issuing pre-departure advisories, reviewing crew scheduling buffers, and notifying connecting passengers. Consider fuel tankering for diversion options.`;
  } else if (score >= 30) {
    risk = 'medium';
    recommendation = `🔶 MODERATE RISK: Delay possible. Monitor weather developments closely. Ensure ground support teams are briefed. Passenger notification recommended if delay exceeds 30 minutes.`;
  } else {
    risk = 'low';
    recommendation = `✅ LOW RISK: Flight expected to depart and arrive on schedule. Standard monitoring procedures apply. No special actions required at this time.`;
  }

  return { score, risk, factors, recommendation };
}

/**
 * Renders the prediction result card.
 */
function renderPredictionResult(flightId, origin, dest, result) {
  const { score, risk, factors, recommendation } = result;
  const container = document.getElementById('predictionResult');

  const riskColors = {
    low:    { color: 'var(--success)', stroke: '#00d68f' },
    medium: { color: 'var(--warning)', stroke: '#ffb347' },
    high:   { color: 'var(--danger)',  stroke: '#ff4757' },
  };

  const rc = riskColors[risk];
  const circumference = 2 * Math.PI * 54; // r=54
  const dashArray = `${(score / 100) * circumference} ${circumference}`;

  container.innerHTML = `
    <div class="result-content">
      <div class="result-gauge">
        <div class="gauge-label">DELAY PROBABILITY SCORE</div>
        <div class="gauge-ring">
          <svg width="130" height="130" viewBox="0 0 130 130">
            <circle class="gauge-bg" cx="65" cy="65" r="54"/>
            <circle class="gauge-fill" cx="65" cy="65" r="54"
              stroke="${rc.stroke}"
              stroke-dasharray="${dashArray}"
              stroke-dashoffset="0"/>
          </svg>
          <div class="gauge-center">
            <span class="gauge-percent" style="color:${rc.color}">${score}%</span>
            <span class="gauge-risk" style="color:${rc.color}">${risk.toUpperCase()} RISK</span>
          </div>
        </div>
        ${flightId ? `<div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);margin-top:8px;">${flightId}: ${origin} → ${dest}</div>` : ''}
      </div>
      <div class="result-factors">
        ${factors.map(f => `
          <div class="factor-item">
            <span class="factor-icon">${f.icon}</span>
            <span class="factor-text">${f.text}</span>
            <span class="factor-impact impact-${f.impact}">${f.impact.toUpperCase()}</span>
          </div>
        `).join('')}
      </div>
      <div class="result-recommendation rec-${risk}">
        ${recommendation}
      </div>
    </div>
  `;
}

/*
  Renders the pre-computed prediction cards grid.
 */
function renderPredictionCards() {
  const grid = document.getElementById('predictionsGrid');
  grid.innerHTML = PREDICTIONS_DATA.map((p, i) => `
    <article class="pred-card" style="animation-delay:${i * 0.07}s">
      <div class="pred-card-header">
        <span class="pred-flight-id">${p.id}</span>
        <span class="pred-risk-badge risk-${p.risk}">${p.risk.toUpperCase()} RISK</span>
      </div>
      <div class="pred-route">${p.route}</div>
      <div class="pred-bar-label">
        <span>Delay Probability</span>
        <span>${p.score}%</span>
      </div>
      <div class="pred-bar-track">
        <div class="pred-bar-fill bar-${p.risk}" style="width:0%" data-target="${p.score}"></div>
      </div>
      <div class="pred-reason">${p.reason}</div>
    </article>
  `).join('');

  // Animate bars on intersection
  const bars = grid.querySelectorAll('.pred-bar-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.width = e.target.dataset.target + '%';
        }, 200);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

function initPredictionEngine() {
  renderPredictionCards();
  document.getElementById('predictBtn').addEventListener('click', () => {
    const flight  = document.getElementById('predFlight').value.trim() || 'N/A';
    const origin  = document.getElementById('predOrigin').value;
    const dest    = document.getElementById('predDest').value;
    const weather = document.getElementById('predWeather').value;
    const wind    = document.getElementById('predWind').value;
    const traffic = document.getElementById('predTraffic').value;

    // Show loading state
    const btn = document.getElementById('predictBtn');
    btn.disabled = true;
    btn.innerHTML = `<span class="spin">⟳</span> Analyzing...`;

    setTimeout(() => {
      const result = runPredictionEngine({ weather, wind, traffic });
      renderPredictionResult(flight, origin || '???', dest || '???', result);
      btn.disabled = false;
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> Analyze & Predict Delay`;
    }, 1400);
  });
}

/* ============================================================
   10. AVIATION ANALYTICS
============================================================ */

function renderAnalyticsStats() {
  const container = document.getElementById('analyticsStats');
  container.innerHTML = ANALYTICS_STATS.map((s, i) => `
    <article class="stat-card" style="--sc-color:${s.color};animation-delay:${i * 0.06}s">
      <div class="stat-card-icon">${s.icon}</div>
      <div class="stat-card-value">${s.value}</div>
      <div class="stat-card-label">${s.label}</div>
      <div class="stat-card-delta ${s.dir === 'up' ? 'delta-up' : 'delta-down'}">${s.dir === 'up' ? '▲' : '▼'} ${s.delta}</div>
    </article>
  `).join('');
}

function renderAirlineBarChart() {
  const container = document.getElementById('airlineBarChart');
  container.innerHTML = AIRLINE_PERF.map(a => `
    <div class="bar-chart-row">
      <div class="bcr-label">${a.name}</div>
      <div class="bcr-track">
        <div class="bcr-fill" style="width:0%" data-target="${a.pct}"></div>
      </div>
      <div class="bcr-value">${a.pct}%</div>
    </div>
  `).join('');

  // Animate on scroll
  const bars = container.querySelectorAll('.bcr-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => {
          bars.forEach(b => { b.style.width = b.dataset.target + '%'; });
        }, 200);
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  obs.observe(container);
}

function renderBusyAirportsChart() {
  const container = document.getElementById('busyBarChart');
  const max = BUSY_AIRPORTS[0].flights;
  container.innerHTML = BUSY_AIRPORTS.map(a => `
    <div class="bar-chart-row">
      <div class="bcr-label">${a.name}</div>
      <div class="bcr-track">
        <div class="bcr-fill" style="width:0%;background:linear-gradient(90deg, var(--accent3), var(--accent2))" data-target="${(a.flights / max * 100).toFixed(1)}"></div>
      </div>
      <div class="bcr-value">${a.flights.toLocaleString()}</div>
    </div>
  `).join('');

  const bars = container.querySelectorAll('.bcr-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => bars.forEach(b => b.style.width = b.dataset.target + '%'), 200);
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  obs.observe(container);
}

/*
  Draws the delay causes donut chart using canvas 2D API.
 */
function renderDonutChart() {
  const canvas = document.getElementById('delayCauses');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 100, cy = 100, r = 75, innerR = 45;
  let startAngle = -Math.PI / 2;

  ctx.clearRect(0, 0, 200, 200);

  DELAY_CAUSES.forEach(slice => {
    const sliceAngle = (slice.pct / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = slice.color;
    ctx.fill();
    startAngle += sliceAngle;
  });

  // Inner hole
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, 2 * Math.PI);
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  ctx.fillStyle = isDark ? '#0d1929' : '#ffffff';
  ctx.fill();

  // Center text
  ctx.fillStyle = isDark ? '#e8f4ff' : '#0c1a2e';
  ctx.font = 'bold 16px Orbitron, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('312', cx, cy - 8);
  ctx.font = '10px JetBrains Mono, monospace';
  ctx.fillStyle = isDark ? '#7fa8c8' : '#2a5278';
  ctx.fillText('DELAYS', cx, cy + 10);

  // Legend
  const legend = document.getElementById('donutLegend');
  legend.innerHTML = DELAY_CAUSES.map(s => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${s.color}"></div>
      <span>${s.label}</span>
      <span class="legend-pct">${s.pct}%</span>
    </div>
  `).join('');
}

function initAnalytics() {
  renderAnalyticsStats();
  renderAirlineBarChart();
  renderBusyAirportsChart();
  // Draw donut when in view
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        renderDonutChart();
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const chartCard = document.getElementById('causesChart');
  if (chartCard) obs.observe(chartCard);
}

/* ============================================================
   11. AVIATION NEWS SECTION
============================================================ */

function renderNews() {
  const grid = document.getElementById('newsGrid');
  grid.innerHTML = NEWS_DATA.map((n, i) => `
    <article class="news-card" style="animation-delay:${i * 0.07}s">
      <div class="news-card-image" style="background:${n.gradient}">
        <span style="position:relative;z-index:1;font-size:3.5rem">${n.icon}</span>
      </div>
      <div class="news-card-body">
        <div class="news-category">${n.category}</div>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-excerpt">${n.excerpt}</p>
        <div class="news-meta">
          <span class="news-time">${n.time}</span>
          <span class="news-source">${n.source}</span>
        </div>
      </div>
    </article>
  `).join('');
}

/* ============================================================
   12. AI INSIGHTS FEED
============================================================ */

const severityStyles = {
  critical: { bg: 'var(--danger-bg)',   border: 'rgba(255,71,87,0.3)' },
  warning:  { bg: 'var(--warning-bg)',  border: 'rgba(255,179,71,0.3)' },
  info:     { bg: 'var(--accent-dim)',  border: 'var(--border-accent)' },
  success:  { bg: 'var(--success-bg)',  border: 'rgba(0,214,143,0.3)' },
};

let activeCat = 'all';

function renderInsights() {
  const feed = document.getElementById('insightsFeed');
  const counter = document.getElementById('insightCount');

  const filtered = activeCat === 'all'
    ? INSIGHTS_DATA
    : INSIGHTS_DATA.filter(ins => ins.cat === activeCat);

  counter.textContent = filtered.length;

  feed.innerHTML = filtered.map((ins, i) => `
    <article class="insight-item severity-${ins.severity}" style="animation-delay:${i * 0.06}s">
      <div class="insight-icon">${ins.icon}</div>
      <div class="insight-body">
        <div class="insight-header">
          <h4 class="insight-title">${ins.title}</h4>
          <span class="insight-time">${ins.time}</span>
        </div>
        <p class="insight-text">${ins.text}</p>
        <div class="insight-tags">
          ${ins.tags.map(t => `<span class="insight-tag">${t}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

function initInsights() {
  renderInsights();

  document.querySelectorAll('.insight-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.insight-cat').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      renderInsights();
    });
  });
}

/* ============================================================
   13. FOOTER CLOCK
============================================================ */

function initFooterClock() {
  const el = document.getElementById('footerTime');
  if (!el) return;

  const update = () => {
    const now = new Date();
    const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    el.textContent = `UTC ${utc.toTimeString().slice(0, 8)} — ${utc.toDateString()}`;
  };

  update();
  setInterval(update, 1000);
}

/* ============================================================
   14. SCROLL-TO-TOP BUTTON
============================================================ */

function initScrollToTop() {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   15. INTERSECTION OBSERVER — FADE IN SECTIONS
============================================================ */

function initScrollAnimations() {
  const els = document.querySelectorAll('.section-header, .filter-bar, .predictor-panel, .insights-panel');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'fadeInUp 0.6s ease both';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

/* ============================================================
   15. INIT — APPLICATION BOOTSTRAP
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Core UI
  initLoadingSequence();
  initNavigation();
  initThemeToggle();
  initScrollToTop();
  initScrollAnimations();

  // Hero
  initHeroAnimations();

  // Ticker
  initTickerBar();

  // Dashboard sections
  initFlightsDashboard();
  renderWeather();
  initPredictionEngine();
  initAnalytics();
  renderNews();
  initInsights();

  // Footer clock
  initFooterClock();

  // Redraw donut chart when theme changes
  document.getElementById('themeToggle').addEventListener('click', () => {
    setTimeout(renderDonutChart, 100);
  });

  console.log('%c✈ SkyIntel Initialized', 'color:#00a8ff;font-family:monospace;font-size:1.1rem;font-weight:700');
  console.log('%cAviation Operations & Delay Intelligence Platform', 'color:#7fa8c8;font-family:monospace;');
});