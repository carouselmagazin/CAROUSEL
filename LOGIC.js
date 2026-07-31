// Countdown for the open call launch.
const countdownTargets = [
  document.getElementById("countdown"),
  document.getElementById("call-overlay-countdown"),
].filter(Boolean);
const openCallDate = new Date(2025, 11, 12, 0, 0, 0); // December is month 11 in JS.
let countdownTimer;

const padTime = (value) => String(value).padStart(2, "0");

const setCountdownContent = (content) => {
  countdownTargets.forEach((target) => {
    target.innerHTML = content;
  });
};

const renderCountdown = () => {
  if (!countdownTargets.length) return;
  const now = new Date();
  const diffMs = openCallDate - now;

  if (diffMs <= 0) {
    setCountdownContent("Call for entries is closed - We are currently reviewing your submissions and will get back to you soon!");
    if (countdownTimer) clearInterval(countdownTimer);
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setCountdownContent(
    `CALL FOR ENTRIES OPENING<br>(${padTime(days)}d.${padTime(hours)}h.${padTime(minutes)}m.${padTime(seconds)}s)`
  );
};

if (countdownTargets.length) {
  countdownTimer = setInterval(renderCountdown, 1000);
  renderCountdown();
}

// Overlay handling for nav buttons.
const overlays = Array.from(document.querySelectorAll(".overlay"));
const navButtons = document.querySelectorAll(".nav-button[data-overlay]");

const closeAllOverlays = () => {
  overlays.forEach((overlay) => {
    overlay.classList.remove("is-visible");
    overlay.setAttribute("aria-hidden", "true");
  });
  navButtons.forEach((btn) => btn.classList.remove("is-active"));
  document.body.classList.remove("overlay-open");
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-overlay");
    const targetOverlay = document.getElementById(targetId);
    if (!targetOverlay) return;
    closeAllOverlays();
    targetOverlay.classList.add("is-visible");
    targetOverlay.setAttribute("aria-hidden", "false");
    navButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
    document.body.classList.add("overlay-open");
  });
});

overlays.forEach((overlay) => {
  overlay.addEventListener("click", (event) => {
    // The backdrop is pointer-events:none (purely visual, so scrolling and
    // clicking work everywhere over the overlay, not just over the panel
    // text). Clicks in the empty area therefore land on the overlay
    // container itself; clicks on the panel content land on a descendant.
    const isEmptyArea = event.target === overlay;
    const isClose = event.target.hasAttribute("data-overlay-close");
    if (isEmptyArea || isClose) {
      closeAllOverlays();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllOverlays();
  }
});

const isOverlayOpen = () =>
  overlays.some((overlay) => overlay.classList.contains("is-visible"));

// Close overlays when clicking anywhere outside nav buttons and the overlay panels.
document.addEventListener("click", (event) => {
  if (!isOverlayOpen()) return;

  const clickedNavButton = event.target.closest(".nav-button");

  // Keep nav buttons opening/closing behavior intact; everything else closes overlays.
  if (clickedNavButton) return;

  closeAllOverlays();
});

// Clickable hotspots over the names printed on the BACKPLATE poster.
// Positions are percentages of the poster image, measured directly from the
// pixel data (ink-density per row) rather than eyeballed, so they line up
// precisely on every pass of the looping background. Both looping copies of
// the poster share this same array, so a correct position here is correct
// on every loop. Tweak top/left/width/height here to nudge a hotspot once
// real bios are added.
const nameHotspots = [
  {
    name: "Luis Steffens",
    top: 4.6, left: 18, width: 47, height: 3.2,
    bio: "After finishing his bachelor degree in architecture at TU Munich in 2023, a year of exchange at TU Delft and an internship in Zurich, Luis Steffens is currently in his master studies at ETH Zurich.",
    title: "Tales of a Forgotten Carpet Pole - From Zinc and Stardust",
  },
  {
    name: "Rose Schuller",
    top: 7.7, left: 18, width: 47, height: 3.2,
    bio: "Rose Schuller completed her bachelor in architecture at BU Weimar and is currently pursuing her master's degree at ETH Zurich. She contributed to horizonte magazine °15 LISTENING and co-published the book Circular city. Circular construction. Heritage?.",
    title: "Tales of a Forgotten Carpet Pole - From Zinc and Stardust",
  },
  {
    name: "Santiago Madueno",
    top: 10.9, left: 18, width: 47, height: 3.2,
    bio: "Born and raised in Lima, Peru. Santiago Madueño finished his bachelor's degree at the Accademia di Architettura di Mendrisio in 2025. After doing internships in Madrid and Basel, he started the Master's degree in Architecture at ETH Zurich since 2025.",
    title: "Tales of a Forgotten Carpet Pole - From Zinc and Stardust",
  },
  {
    name: "Luisa Huber",
    top: 15, left: 18, width: 47, height: 3.2,
    bio: "Luisa Huber studierte Architektur an der Technischen Universität München sowie an der Akademie der Bildenden Künste in Wien. In ihren Arbeiten beschäftigt sie sich mit der Transformation des Gebäudebestandes und richtet ihren Fokus auf die räumliche Qualität sowie gestalterische Identität der Bauwerke. Parallel zum Studium arbeitete sie mehrere Jahre in der Stadtplanung und wirkte an städtebaulichen Analysen sowie Entwürfen mit.",
    title: "Unterbelichtet, übersehen - Zur verborgenen Wirksamkeit der Nachkriegsarchitektur",
  },
  {
    name: "COAT",
    top: 18.3, left: 18, width: 47, height: 3.2,
    bio: "COAT - conditions atmosphériques d'espace - ist ein in Wien ansässiges Kunst- und Architektur-Studio, gegründet von Julia Fraolini (FRA) und Felix Steinbacher (DEU). Durch experimentelle, atmosphärische Raumansätze untersucht Ihre Arbeit die Wechselwirkung zwischen Architektur und Gesellschaft sowie deren impliziter zeitgenössischer Herausforderungen. Praktischer Fokus liegt in der Untersuchung des Potentials von Architektur in der Gestaltung sozio-kultureller Phänomene durch experimentelle Re-Interpretation archetypischer Gegebenheiten; Individuum und Kollektiv sollen inspiriert werden Gewohnheiten, Lebensweisen sowie Ihre Beziehung zur gemeinsamen Umwelt zu re-evaluieren. Durch Ihre Projekte sollen räumlich-architektonische Narrative neu definiert und konventionelle Denkweisen hinterfragt werden.\n\nJulia Fraolini ist eine französische Architekturgestalterin, sie lebt und arbeitet in Wien. 2021 schloß Sie Ihr Masterstudium der Architektur als Diplom-Ingenieurin am studio3 Institut für Experimentelle Architektur, Universität Innsbruck, unter der Betreuung von Univ. Prof. Arch DI Kathrin Aste ab. Julia hat in verschiedenen Architekturbüros in Paris, Innsbruck, Wien und Barcelona gearbeitet und wurde mit dem TISCHE-Stipendium 2023 sowie dem Startstipendium 2026 ausgezeichnet.\n\nFelix Steinbacher ist ein deutscher Architekturgestalter, er lebt und arbeitet in Wien. 2021 schloss er sein Masterstudium der Architektur als Diplom-Ingenieur am ./studio3 Institut für Experimentelle Architektur, Universität Innsbruck, unter der Betreuung von Univ. Prof. Arch DI Kathrin Aste ab. Felix arbeitete für das Innsbrucker Architekturbüro LAAC und arbeitet aktuell für Wolfgang Tschapeller, Wien. Er wurde mit dem Startstipendium 2025 ausgezeichnet.",
    title: "Every time you blink you feel it Change - Kollektiver Raum als Träger (un)sichtbarer Spuren täglicher Nutzung",
  },
  {
    name: "Ben Standke",
    top: 21.3, left: 18, width: 47, height: 3.2,
    bio: "Ben Standke is a recent architecture graduate from Bauhaus University Weimar. Originally from Basel, he moved to Berlin to study art history before turning to architecture. His work focuses on public space, queer theory, and spatial appropriation. He has worked for Dogma in Brussels, contributing to exhibitions and publications, including 'the Urban Villa'.",
    title: "made of bodies",
  },
  {
    name: "Ruth Henneke",
    top: 24.6, left: 18, width: 47, height: 3.2,
    bio: "Ich bin Ruth, 26 Jahre alt, und studiere Architektur (B.A.) an der Technischen Universität München. Zuvor habe ich meinen Bachelor in Psychologie an der Ludwig-Maximilians-Universität München abgeschlossen. Mein besonderes Interesse gilt der Schnittstelle zwischen Architektur und Psychologie. Mich beschäftigt vor allem, wie Räume auf Menschen wirken: wie sie Zugehörigkeit, Wohlbefinden und Identifikation fördern können aber auch, wie sie Ausschlüsse erzeugen oder verstärken. In meiner Bachelorarbeit in Psychologie habe ich mich mit Lernräumen auseinandergesetzt und untersucht, welchen Einfluss räumliches Design auf Lernprozesse hat. Daran knüpfe ich in meinem Architekturstudium an: Auch meine Bachelorarbeit widmet sich den sozialen und gesellschaftlichen Dimensionen von Raum, mit einem besonderen Fokus auf queere Lebensrealitäten.",
    title: "Queere Räume unter Spannung",
  },
  {
    name: "Marie Langholz",
    top: 28.3, left: 18, width: 47, height: 3.2,
    bio: "Marie Langholz's work is concerned, among other things, with unmasking the power relations implied in the production and reproduction of space. She studied architecture at Bauhaus University Weimar and is currently pursuing her master's degree at EPFL Lausanne. She has further conducted research and worked for various practices, including Mona Mahall, Bernd Schmutz, and 51n4e. Since 2024, she has been teaching with Unmasking Space at ETH Zurich.",
    title: "Rooms on Fire - Single Women, the Ledigenheim (and the Politics of Representation) in Early 20th-Century Germany",
  },
  {
    name: "Lara Huth",
    top: 32.1, left: 18, width: 47, height: 3.2,
    bio: "Lara Huth is a bachelor student in Architecture at the Technical University of Munich and has a curricular background in Political and Social Studies at Julius-Maximilians-University Würzburg. She works as a student assistant at the Chair of Architectural History and Curatorial Practice at TUM.",
    title: "Brick and Bodies in Motion",
  },
  {
    name: "Gabriyel Dari",
    top: 35.2, left: 18, width: 47, height: 3.2,
    bio: "Gabriyel Dari is an architect and independent researcher, currently based in Zurich, Switzerland. His work focuses on engaging with landscapes, infrastructures, and the role of humans in the age of the Anthropocene. His thinking deliberately transcends the boundaries of architecture, thus seeking new understandings of responsibility and design through interdisciplinary discourse – across art, theory, technology, nature, and space.",
    title: "URUZ - Journey through the land of Scandinavia",
  },
  {
    name: "Fabian Kohler",
    top: 38.4, left: 18, width: 47, height: 3.2,
    bio: "Fabian Kohler, born 2003, studies Architecture at the Federal Institute of Technology in Zürich. His work explores Alpine landscapes as infrastructural and political systems.",
    title: "Sub Nive - A Short Eulogy of the Grand St. Bernard",
  },
  {
    name: "Antonia Schlosser",
    top: 42.2, left: 18, width: 47, height: 3.2,
    bio: "Studium der Geographie (B.Sc.) an der Universität Wien, Studium der „Sozialraumorientierten Sozialen Arbeit\" (M.A.) mit Forschungsschwerpunkt auf kritischer Stadtforschung und Raumaneignung.",
    title: "Nehmt ihr uns eine* – nehmen wir uns Räume. - Kollektives Kritisches Kartieren zur Sichtbarmachung patriarchaler Gewalt",
  },
  {
    name: "Alina Siemering",
    top: 45.4, left: 18, width: 47, height: 3.2,
    bio: "Studium der Soziologie und Politikwissenschaft (B.A.) an der Universität Hamburg und Universitet i Oslo sowie der Internationalen Entwicklung (MA) an der Universität Wien mit Forschungsschwerpunkt auf kritischer Stadtforschung, Intersektionalität, sozialen Bewegungen und emanzipatorischer Kulturarbeit.",
    title: "Nehmt ihr uns eine* – nehmen wir uns Räume. - Kollektives Kritisches Kartieren zur Sichtbarmachung patriarchaler Gewalt",
  },
  {
    name: "Mats Werchohlad",
    top: 53.3, left: 18, width: 47, height: 3.2,
    bio: "Mats Werchohlad erforscht Raum- und Transformationsdynamiken an der Schnittstelle von Technik, Bildung und Gesellschaft. An der Kunsthochschule Kassel ist er als wissenschaftlicher Mitarbeiter an der Professur Theorie und Praxis der Gestaltung tätig. Im Rahmen seines Promotionsprojekts forscht er zu Refigurationen der Landschaft am historischen Bauhaus. Zuvor forschte und lehrte er als Mitarbeiter an der Professur Raumplanung und Raumforschung der Bauhaus-Universität Weimar sowie am Institut Verkehr und Raum der Fachhochschule Erfurt.",
    title: "Im negativen Horizont - Zur Ästhetik des Verschwindens und den (Un-)Möglichkeiten ihrer Bewältigung",
  },
  {
    name: "Joshua Kiefer",
    top: 56.9, left: 18, width: 47, height: 3.2,
    bio: "Seit dem Wintersemester 2025/2026 studiere ich im Master Architektur an der TU München. Zuvor absolvierte ich meinen Bachelor an der RWTH Aachen und der HSRM in Wiesbaden, und arbeitete anschließend ein Jahr als Praktikant in einem Architekturbüro in Zürich. Besonders interessieren mich unter anderem die Bedingungen, unter denen Architektur entsteht und gelernt wird, sowie der Einfluss und Handlungsspielraum, der sich Architektinnen und Architekten, gerade im Kontext der Klimakrise, eröffnet.",
    title: "Im Zweifel für den Zweifel - Von unsichtbaren Zweifeln in der Architekturausbildung und wie man sie sich zu eigen macht",
  },
  {
    name: "David Herrmann",
    top: 67, left: 18, width: 47, height: 3.2,
    bio: "David Herrmann ist M.A. Architektur und absolvierte sein Studium an der Technischen Universität München und der Bauhaus-Universität Weimar. Zudem studierte er Arabistik an der Universität Leipzig. Er arbeitete u. a. bei Muck Petzet Architekten, Fink + Jocher sowie bei Hartmann Architekten in München. 2022 gründete er Studio Salto, ein junges Büro für Architektur und Bild mit Sitz in München. Seit 2024 lehrt er an der Akademie der Bildenden Künste München sowie seit 2026 an der Hochschule München.",
    title: "Searching for Sugar Man",
  },
  {
    name: "Anne Kalthöner",
    top: 70.5, left: 18, width: 47, height: 3.2,
    bio: "Anne is a Cologne-based architect, critical urbanist and researcher. Born and raised in Franconia, she studied at Bauhaus-University, Tec de Monterrey and KU Leuven Brussels before and after working with international practices in Mexico, Switzerland, Belgium, and Germany. Her work focuses on feminism and the design of spaces that foster social negotiation and collective exchange. A recurring theme throughout her practice is the architect's role as an activist. More recently, Anne has become a self-proclaimed dice-game expert and developed a particular passion for Kniffel.",
    title: "Architecture is my Religion - Affirmations of a faithful architect",
  },
  {
    name: "Marlene Koßmann",
    top: 74, left: 18, width: 47, height: 3.2,
    bio: "Marlene works as an architect in Berlin. Alongside her studies at RWTH Aachen and KU Leuven, she gained experience in places like Düsseldorf, Basel and Brussels. For her, spatial questions are closely tied to social ones: interests such as the sociology of space, intersectional feminism, and critical theory shape the way she looks at how the world is designed – not as finished products, but as stages where stories unfold through the people who inhabit them. This perspective keeps drawing her back to the question of how to build within the existing – concretely, on site, and experimentally. More recently, she has been capturing some of these stories in illustrations – mostly digital, sometimes analog – with a particular fondness for comics as a medium.",
    title: "Architecture is my Religion - Affirmations of a faithful architect",
  },
  {
    name: "Lukas Großmann",
    top: 77.55, left: 18, width: 47, height: 3.2,
    bio: "Lukas Großmann studierte Architektur am Karlsruher Institut für Technologie (DE) und an der Technischen Universität Eindhoven (NL) und schloss sein Masterstudium mit Schwerpunkt auf dem architektonischen und kulturellen Erbe ab. Er ist akademischer Mitarbeiter in einem Forschungsprojekt, freier Mitarbeiter in einem Architekturbüro und Grafikdesigner sowie Autor von Artikeln zur Geschichte und Theorie der Architektur. Seine Arbeit ist im diskursiven Feld angesiedelt und befasst sich mit der gesellschaftlichen Relevanz und den politischen Dimensionen unserer gebauten Umwelt. Er ist zudem Mitglied von Architects4THF, einem internationalen Netzwerk, das sich gegen die Bebauung des Berliner Tempelhofer Feldes einsetzt und sich durch kollektive Raumgestaltung mit der sozioökologischen Zukunft von Städten auseinandersetzt.",
    title: "Was wir aufbauen, könnt ihr nicht sehen",
  },
  {
    name: "c/o now",
    top: 80.8, left: 18, width: 47, height: 3.2,
    bio: "c/o now ist ein 2017 in Berlin gegründetes Architekturbüro, das sich an kollektiven Praxen orientiert. c/o now ist zum Zeitpunkt des Drucks dieser Publikation: Tobias Hönig, Andrijana Ivanda, Pola Koch, Markus Rampl, Paul Reinhardt, Sebastian Rothkopf, Duy An Tran und Ksenija Zdešar sowie alle an der Durchführung eines Projekts Beteiligten. Das Büro befasst sich mit der Entwicklung von Objekten, Architektur und Stadträumen sowie der redaktionellen Aufarbeitung der damit verbundenen Themen. c/o now verantwortet darüber hinaus Lehre an verschiedenen Hochschulen, derzeit an der Neuen Architekturschule Siegen, der Muthesius-Kunsthochschule in Kiel und der Universität Innsbruck. Ihre Bauten waren mehrfach auf der Shortlist des DAM Preises. 2023 gewann c/o now den Bauwelt-Preis.",
    title: "Das höchste Gebäude Deutschlands, zunehmend unsichtbar",
  },
  {
    name: "Tim Schellhammer",
    top: 84.1, left: 18, width: 47, height: 3.2,
    bio: "Tim Schellhammer ist in München aufgewachsen und Mitgründer von optimist office. optimist office ist ein Architekturbüro, das die soziale und ökologische Transformation des bestehenden Gebäudebestands aktiv mitgestalten will. Das Ziel sind die Erforschung, Planung und Umsetzung von Umnutzungsstrategien in Architektur und Stadtentwicklung sowie die Prägung optimistischer Narrative. Berufserfahrung sammelte er unter anderem bei BüroKrucker in Zürich und bei Sergison Bates architects in London. Seit 2025 lehrt er an der Technischen Universität München als Teil von Studio Krucker Bates.",
    title: "Speculating against Speculation",
  },
  {
    name: "Felix Tepel",
    top: 87.2, left: 18, width: 47, height: 3.2,
    bio: "Felix Ben Tepel studiert im Master Architektur an der TU Berlin. Während seines Bachelorstudiums in Weimar arbeitete und engagierte er sich bei der studentischen Initiative für Architekturdiskurs Horizonte. und entwickelte ein starkes Interesse an der gesellschaftspolitischen Dimension von Architektur, Stadt und Raum. Im Rahmen seiner Bachelorarbeit \"Große Freiheit für die »kleinen Leute«?\" setzte sich Felix am Beispiel der Weimarer Siedlung Siedlersfreud kritisch mit den politischen Hintergründen eines Programms zur Förderung des Eigenheims als Wohnform der Arbeiterklasse aus den 1930er Jahren auseinander. Im Moment beschäftigt sich Felix mit den Widersprüchen zwischen Berufsbildern und Berufspraxis in der Architektur und den gesellschaftlichen Bedingungen der Architekturarbeit.",
    title: "Urhütte Eigenheim? - Zur Entstehungs- und Verbreitungsgeschichte des Eigenheims und ihren politischen Hintergründen",
  },
  {
    name: "Cara Hähl-Pfeifer",
    top: 91.1, left: 18, width: 47, height: 3.2,
    bio: "Cara Hähl-Pfeifer is a curator and research associate at the Architekturmuseum der TUM. She holds a Master's degree in Architecture from the Technical University of Munich. Her work spans multiple disciplines and media, combining her interests in architectural practice and research, education, and curating.",
    title: "How Would You Rate Your Experience Today? - Digital Memoir of Failed Speculation",
  },
  {
    name: "Māra Starka",
    top: 94.3, left: 18, width: 47, height: 3.2,
    bio: "Māra Starka is an architect practicing in Riga. She holds a Master's degree in Architecture from the Technical University of Munich. Her work spans education, storytelling, curation, and computation. She is currently working on projects in real estate. Māra and Cara first met in 2024 while working as curatorial assistants at the Architekturmuseum der TUM, where they bonded over their shared interest in anything other than architecture.",
    title: "How Would You Rate Your Experience Today? - Digital Memoir of Failed Speculation",
  },
];

const namePanel = document.getElementById("name-panel");
const namePanelText = document.getElementById("name-panel-text");

const showNamePanel = (spot) => {
  if (!namePanel || !namePanelText) return;
  namePanelText.innerHTML = "";

  const heading = document.createElement("p");
  heading.className = "name-panel__name";
  heading.textContent = spot.name;
  namePanelText.appendChild(heading);

  const bio = document.createElement("p");
  bio.className = "name-panel__bio";
  bio.textContent = spot.bio;
  namePanelText.appendChild(bio);

  const titleLabel = document.createElement("p");
  titleLabel.className = "name-panel__title-label";
  titleLabel.textContent = "ISSUE #01 Beitrag:";
  namePanelText.appendChild(titleLabel);

  const title = document.createElement("p");
  title.className = "name-panel__title";
  title.textContent = spot.title;
  namePanelText.appendChild(title);

  namePanel.classList.add("is-visible");
  namePanel.setAttribute("aria-hidden", "false");
};

const hideNamePanel = () => {
  if (!namePanel) return;
  namePanel.classList.remove("is-visible");
  namePanel.setAttribute("aria-hidden", "true");
};

document.querySelectorAll(".backplate__page").forEach((page) => {
  nameHotspots.forEach((spot) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "name-hotspot";
    button.style.top = `${spot.top}%`;
    button.style.left = `${spot.left}%`;
    button.style.width = `${spot.width}%`;
    button.style.height = `${spot.height}%`;
    button.setAttribute("aria-label", spot.name);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showNamePanel(spot);
    });
    page.appendChild(button);
  });
});

// Clicking a different hotspot (handled above, which stops propagation)
// swaps the panel content instead of closing it. Any other click - on the
// panel text itself or on empty background - closes it.
document.addEventListener("click", () => {
  if (!namePanel || !namePanel.classList.contains("is-visible")) return;
  hideNamePanel();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideNamePanel();
});
