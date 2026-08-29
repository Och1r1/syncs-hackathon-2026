const q = sel => document.querySelector(sel);
const qa = sel => [...document.querySelectorAll(sel)];

/* =========================================================
   HOME ARCHIVE DATA (existing exhibit panel on the homepage)
   ========================================================= */
const countries = {
  vietnam: {
    number: '001 / 034', country: 'Vietnam', seal: '★', stamp: 'VN',
    game: 'Ô Ăn Quan', alias: 'Also known as Ô Quan · a traditional Vietnamese strategy game.',
    description: 'A counting and strategy game remembered across generations in Vietnam. Its simple board hides careful planning, mental arithmetic and a strong social tradition.',
    preview: 'assets/vn-preview.png', title: 'Ô Ăn Quan Board', type: 'Game board', markerColor: '#b84a2f',
    steps: [
      'Players distribute pieces through the board’s small fields.',
      'Pieces are collected and redistributed according to the next field.',
      'The aim is to capture more pieces through careful counting and timing.'
    ]
  },
  japan: {
    number: '002 / 034', country: 'Japan', seal: '日', stamp: 'JP',
    game: 'Kemari', alias: 'A ceremonial ball game associated with Japan’s imperial court.',
    description: 'Kemari is cooperative rather than competitive. Players keep a ball in the air together, turning graceful movement, clothing and ritual into part of the experience.',
    preview: 'assets/jp-card.png', title: 'Kemari Ball', type: 'Ceremonial ball', markerColor: '#c56f37', labelX: '-62px', labelY: '19px',
    steps: [
      'Players form a circle in a defined playing area.',
      'The ball is kept in the air using controlled kicks.',
      'The shared goal is rhythm, elegance and keeping the rally alive.'
    ]
  },
  ghana: {
    number: '003 / 034', country: 'Ghana', seal: '✦', stamp: 'GH',
    game: 'Oware', alias: 'A member of the mancala family of sowing and counting games.',
    description: 'Oware transforms a simple row of pits and seeds into a deep strategy game. It has long been played socially across West Africa and passed on through direct teaching.',
    preview: 'assets/gh-card.png', title: 'Oware Board', type: 'Sowing board', markerColor: '#7d6b2b',
    steps: [
      'Choose one of your pits and pick up all of its seeds.',
      'Sow the seeds one by one into the following pits.',
      'Capture according to the board state and finish with the larger store.'
    ]
  },
  mongolia: {
    number: '004 / 034', country: 'Mongolia', seal: 'ᠮ', stamp: 'MN',
    game: 'Shagai', alias: 'Sheep anklebones, thrown for games, chance and fortune-telling.',
    description: 'Shagai have been used across the Mongolian steppe for generations — for children’s games, for teaching counting, and for reading fortune in the four positions a bone can land on.',
    preview: 'assets/vn-preview.png', title: 'Shagai Anklebone', type: 'Bone piece', markerColor: '#9463a0',
    steps: [
      'Four anklebones are cast onto a flat surface or felt.',
      'Each bone settles into one of four positions: horse, camel, sheep or goat.',
      'The resulting combination is read as a fortune or used to score a game.'
    ]
  },
  madagascar: {
    number: '005 / 034', country: 'Madagascar', seal: '✧', stamp: 'MG',
    game: 'Fanorona', alias: 'Fanoron-Tsivy · a capturing board game from the Merina highlands.',
    description: 'Fanorona is played on the intersections of a nine-by-five grid, where a single move can sweep an entire line of stones off the board. It has been recorded in Madagascar since at least the seventeenth century and was long associated with the Merina court.',
    preview: 'assets/gh-card.png', title: 'Fanoron-Tsivy Board', type: 'Capturing board game', markerColor: '#7d6b2b', labelX: '24px', labelY: '14px',
    steps: [
      'Stones fill every intersection of a nine-by-five grid, leaving only the centre empty.',
      'Move a stone along a line to capture by approach, or away from one to capture by withdrawal.',
      'Keep chaining captures with the same stone while it can, until neither side has a capture left.'
    ]
  }
};

const atlasEntries = {
  southKorea: {
    number: '005 / 034', country: 'South Korea', seal: 'KR', stamp: 'KR',
    game: 'Yut Nori (윷놀이)', alias: 'A Korean board race game played by throwing four wooden sticks.',
    description: 'Players throw four wooden sticks and move pieces around a board according to how the sticks land.',
    preview: 'assets/vn-preview.png', title: 'Yut Nori Sticks', type: 'Board race game', markerColor: '#b84a2f', labelX: '-106px',
    steps: ['Throw four wooden sticks.', 'Read the landing pattern as a move value.', 'Move pieces around the board and try to bring them home first.']
  },
  china: {
    number: '006 / 034', country: 'China', seal: 'CN', stamp: 'CN',
    game: 'Jianzi (毽子)', alias: 'A shuttlecock kicking game played without using the hands.',
    description: 'Players keep a weighted shuttlecock in the air using their feet, knees and body without using their hands.',
    preview: 'assets/jp-card.png', title: 'Jianzi Shuttlecock', type: 'Shuttlecock game', markerColor: '#d86f38', labelY: '17px',
    steps: ['Serve the weighted shuttlecock into the air.', 'Keep it airborne using feet, knees and body control.', 'Continue the rally without using hands.']
  },
  india: {
    number: '007 / 034', country: 'India', seal: 'IN', stamp: 'IN',
    game: 'Pachisi', alias: 'An ancient cross-shaped race board game using shells or dice.',
    description: 'Ancient cross-shaped board game where players race pieces around the board using cowrie shells or dice.',
    preview: 'assets/vn-preview.png', title: 'Pachisi Board', type: 'Board race game', markerColor: '#d28a30',
    steps: ['Roll cowrie shells or dice.', 'Move pieces around the cross-shaped track.', 'Race all pieces safely to the centre.']
  },
  thailand: {
    number: '008 / 034', country: 'Thailand', seal: 'TH', stamp: 'TH',
    game: 'Makruk (หมากรุก)', alias: 'A traditional Thai strategy board game related to chess.',
    description: 'Traditional Thai strategy board game related to chess, with distinctive pieces and rules.',
    preview: 'assets/jp-card.png', title: 'Makruk Pieces', type: 'Strategy board game', markerColor: '#b84a2f', labelX: '-97px', labelY: '14px',
    steps: ['Set up the Thai chess pieces.', 'Move pieces according to Makruk rules.', 'Protect the king while forcing the opponent into defeat.']
  },
  philippines: {
    number: '009 / 034', country: 'Philippines', seal: 'PH', stamp: 'PH',
    game: 'Sungka', alias: 'A mancala-style board game using shells, stones or seeds.',
    description: 'Mancala-style game using a long wooden board with small shells or stones placed into pits.',
    preview: 'assets/gh-card.png', title: 'Sungka Board', type: 'Mancala board game', markerColor: '#3d8f82', labelX: '24px', labelY: '13px',
    steps: ['Choose a pit of shells or stones.', 'Distribute pieces one by one along the board.', 'Collect the most pieces in your store.']
  },
  indonesia: {
    number: '010 / 034', country: 'Indonesia', seal: 'ID', stamp: 'ID',
    game: 'Congklak', alias: 'An Indonesian mancala game played on a carved wooden board.',
    description: 'Traditional mancala game played with a carved wooden board and shells, seeds or stones.',
    preview: 'assets/gh-card.png', title: 'Congklak Board', type: 'Mancala board game', markerColor: '#3d8f82', labelX: '-104px',
    steps: ['Select shells, seeds or stones from a pit.', 'Sow them around the carved board.', 'Capture and store more pieces than the opponent.']
  },
  malaysia: {
    number: '011 / 034', country: 'Malaysia', seal: 'MY', stamp: 'MY',
    game: 'Congkak', alias: 'A Malaysian shell-and-seed board game from the mancala family.',
    description: 'Traditional board game where players distribute shells or seeds between holes to collect the most pieces.',
    preview: 'assets/gh-card.png', title: 'Congkak Board', type: 'Mancala board game', markerColor: '#3d8f82', labelY: '17px',
    steps: ['Pick up shells or seeds from one house.', 'Move around the board placing one piece in each hole.', 'Build the largest store.']
  },
  kazakhstan: {
    number: '012 / 034', country: 'Kazakhstan', seal: 'KZ', stamp: 'KZ',
    game: 'Asyk Atu', alias: 'A Central Asian target game played with sheep ankle bones.',
    description: 'Players use sheep ankle bones, called asyk, and attempt to knock other bones out of a target area.',
    preview: 'assets/vn-preview.png', title: 'Asyk Bones', type: 'Bone target game', markerColor: '#9463a0', labelX: '-108px',
    steps: ['Place ankle bones in a marked target area.', 'Throw or flick an asyk toward the target.', 'Score by knocking bones out of the area.']
  },
  turkiye: {
    number: '014 / 034', country: 'Türkiye', seal: 'TR', stamp: 'TR',
    game: 'Mangala', alias: 'A Turkish mancala game built around sowing and capturing stones.',
    description: "Turkish mancala game involving moving stones through pits and capturing an opponent's stones.",
    preview: 'assets/gh-card.png', title: 'Mangala Board', type: 'Mancala board game', markerColor: '#3d8f82',
    steps: ['Move stones through the row of pits.', 'Set up captures through careful counting.', "Collect more stones than the opponent."]
  },
  greece: {
    number: '015 / 034', country: 'Greece', seal: 'GR', stamp: 'GR',
    game: 'Tavli', alias: 'A family of backgammon-style games popular in Greece.',
    description: 'Extremely popular traditional family game consisting of several related backgammon-style games.',
    preview: 'assets/jp-card.png', title: 'Tavli Board', type: 'Backgammon-style game', markerColor: '#2d7a9f', labelX: '-82px',
    steps: ['Roll dice to move checkers.', 'Use blocks and captures to control the board.', 'Clear your pieces before the opponent.']
  },
  portugal: {
    number: '016 / 034', country: 'Portugal', seal: 'PT', stamp: 'PT',
    game: 'Jogo da Malha', alias: 'A Portuguese throwing game where metal discs are aimed at a pin.',
    description: 'Players throw metal discs, called malhas, toward a target pin and score by knocking it down or landing closest.',
    preview: 'assets/jp-card.png', title: 'Malha Discs', type: 'Throwing game', markerColor: '#2d7a9f', labelX: '-94px', labelY: '-20px',
    steps: ['Set the target pin at a distance.', 'Throw metal discs toward the pin.', 'Score by striking the pin or landing closest to it.']
  },
  italy: {
    number: '017 / 034', country: 'Italy', seal: 'IT', stamp: 'IT',
    game: 'Bocce', alias: 'An Italian target-ball game played toward a small pallino.',
    description: 'Players roll balls toward a smaller target ball called the pallino.',
    preview: 'assets/jp-card.png', title: 'Bocce Balls', type: 'Throwing game', markerColor: '#2d7a9f', labelY: '18px',
    steps: ['Set the pallino as the target.', 'Roll bocce balls toward it.', 'Score with the balls closest to the target.']
  },
  spain: {
    number: '018 / 034', country: 'Spain', seal: 'ES', stamp: 'ES',
    game: 'Calva', alias: 'A Spanish throwing game aimed at a wooden target.',
    description: 'Traditional throwing game where players throw a heavy object at a wooden target positioned some distance away.',
    preview: 'assets/jp-card.png', title: 'Calva Target', type: 'Throwing game', markerColor: '#2d7a9f', labelX: '-76px',
    steps: ['Set the wooden target at a distance.', 'Throw the heavy piece toward it.', 'Score when the target is struck cleanly.']
  },
  unitedKingdom: {
    number: '019 / 034', country: 'United Kingdom', seal: 'UK', stamp: 'UK',
    game: 'Skittles', alias: 'A traditional pub game where players knock down wooden pins.',
    description: 'Traditional pub game where players throw a ball or object to knock down wooden pins.',
    preview: 'assets/jp-card.png', title: 'Wooden Skittles', type: 'Pin game', markerColor: '#2d7a9f', labelX: '-138px',
    steps: ['Set up wooden pins.', 'Throw or roll the ball toward them.', 'Score by knocking down as many pins as possible.']
  },
  ireland: {
    number: '020 / 034', country: 'Ireland', seal: 'IE', stamp: 'IE',
    game: 'Road Bowling', alias: 'An Irish road game won by covering a route in the fewest throws.',
    description: 'Players throw a metal ball along a country road, trying to reach the finish using the fewest throws.',
    preview: 'assets/jp-card.png', title: 'Road Bowling Ball', type: 'Road throwing game', markerColor: '#2d7a9f', labelX: '-92px', labelY: '16px',
    steps: ['Start from a marked road point.', 'Throw the metal ball along the route.', 'Reach the finish in the fewest throws.']
  },
  netherlands: {
    number: '021 / 034', country: 'Netherlands', seal: 'NL', stamp: 'NL',
    game: 'Sjoelen', alias: 'A Dutch table game played by sliding wooden discs.',
    description: 'Players slide wooden discs down a long wooden board into numbered scoring compartments.',
    preview: 'assets/jp-card.png', title: 'Sjoelen Board', type: 'Table sliding game', markerColor: '#2d7a9f', labelY: '-26px',
    steps: ['Slide wooden discs down the board.', 'Aim for numbered scoring slots.', 'Use remaining turns to improve the score.']
  },
  finland: {
    number: '022 / 034', country: 'Finland', seal: 'FI', stamp: 'FI',
    game: 'Mölkky', alias: 'A Finnish skittle game where players aim for exactly 50 points.',
    description: 'Players throw a wooden pin at numbered wooden skittles and attempt to reach exactly 50 points.',
    preview: 'assets/jp-card.png', title: 'Mölkky Pins', type: 'Pin throwing game', markerColor: '#2d7a9f', labelX: '-82px',
    steps: ['Set up numbered wooden skittles.', 'Throw the mölkky pin.', 'Reach exactly 50 points without going over.']
  },
  sweden: {
    number: '023 / 034', country: 'Sweden', seal: 'SE', stamp: 'SE',
    game: 'Kubb', alias: 'A Swedish lawn game of batons, blocks and a central king.',
    description: 'Teams throw wooden batons to knock over wooden blocks before attacking the central King.',
    preview: 'assets/jp-card.png', title: 'Kubb Blocks', type: 'Lawn throwing game', markerColor: '#2d7a9f', labelY: '18px',
    steps: ['Set kubbs on each baseline and the king in the centre.', 'Throw batons to knock over opposing blocks.', 'Topple the king only after clearing the field.']
  },
  switzerland: {
    number: '024 / 034', country: 'Switzerland', seal: 'CH', stamp: 'CH',
    game: 'Hornussen', alias: 'A Swiss striking game involving a fast projectile and defensive paddles.',
    description: 'Players strike a small projectile called a Nouss while the opposing team tries to intercept it using large paddles.',
    preview: 'assets/jp-card.png', title: 'Hornussen Nouss', type: 'Striking field game', markerColor: '#2d7a9f', labelX: '24px', labelY: '-24px',
    steps: ['Strike the Nouss from the launch ramp.', 'Send it deep into the field.', 'Opponents try to intercept it with large paddles.']
  },
  mexico: {
    number: '025 / 034', country: 'Mexico', seal: 'MX', stamp: 'MX',
    game: 'Balero', alias: 'A cup-and-ball dexterity game played with a stringed wooden ball.',
    description: 'Traditional cup-and-ball game where a wooden ball attached by string must be caught on a stick or inside a cup.',
    preview: 'assets/vn-preview.png', title: 'Balero Toy', type: 'Dexterity toy game', markerColor: '#357a45',
    steps: ['Swing the attached wooden ball.', 'Control the string and timing.', 'Catch the ball on the stick or in the cup.']
  },
  unitedStates: {
    number: '026 / 034', country: 'United States', seal: 'US', stamp: 'US',
    game: 'Horseshoes', alias: 'A target throwing game played toward metal stakes.',
    description: 'Players throw horseshoes toward metal stakes to score points, especially by landing a ringer.',
    preview: 'assets/jp-card.png', title: 'Horseshoe Stakes', type: 'Throwing game', markerColor: '#357a45',
    steps: ['Stand at the pitching line.', 'Throw horseshoes toward the stake.', 'Score by landing close or making a ringer.']
  },
  canada: {
    number: '027 / 034', country: 'Canada', seal: 'CA', stamp: 'CA',
    game: 'Crokinole', alias: 'A Canadian disc-flicking board game.',
    description: 'Players flick wooden discs across a circular wooden board, trying to land them in high-scoring areas.',
    preview: 'assets/gh-card.png', title: 'Crokinole Board', type: 'Disc board game', markerColor: '#357a45', labelX: '-88px',
    steps: ['Flick wooden discs from the outer ring.', 'Aim for high-scoring circles.', 'Knock opposing discs away while keeping your own in play.']
  },
  brazil: {
    number: '028 / 034', country: 'Brazil', seal: 'BR', stamp: 'BR',
    game: 'Peteca', alias: 'A Brazilian hand-shuttlecock game with Indigenous roots.',
    description: 'Players strike a hand shuttlecock over a net using their palms; derived from Indigenous Brazilian traditions.',
    preview: 'assets/jp-card.png', title: 'Peteca Shuttlecock', type: 'Shuttlecock game', markerColor: '#357a45',
    steps: ['Serve the peteca with the palm.', 'Strike it over the net.', 'Keep the rally going through timing and placement.']
  },
  argentina: {
    number: '029 / 034', country: 'Argentina', seal: 'AR', stamp: 'AR',
    game: 'Pato', alias: "Argentina's national horseback game.",
    description: "Traditional horseback game combining elements resembling polo and basketball; Argentina's national sport.",
    preview: 'assets/jp-card.png', title: 'Pato Horseback Game', type: 'Horseback field game', markerColor: '#357a45',
    steps: ['Ride with teammates across the field.', 'Carry or contest the handled ball.', 'Score by throwing it through the target ring.']
  },
  chile: {
    number: '030 / 034', country: 'Chile', seal: 'CL', stamp: 'CL',
    game: 'Rayuela Chilena', alias: 'A Chilean throwing game aimed at a line in a clay-filled box.',
    description: 'Players throw metal discs toward a line stretched across a clay-filled target box.',
    preview: 'assets/jp-card.png', title: 'Rayuela Target Box', type: 'Throwing game', markerColor: '#357a45', labelX: '-82px',
    steps: ['Stand back from the clay-filled target box.', 'Throw the metal disc toward the line.', 'Score by landing closest to or on the line.']
  },
  peru: {
    number: '031 / 034', country: 'Peru', seal: 'PE', stamp: 'PE',
    game: 'Sapo', alias: 'A target table game where throws aim for holes and a frog mouth.',
    description: "Players throw metal coins or discs toward a table containing scoring holes and a metal frog's open mouth.",
    preview: 'assets/jp-card.png', title: 'Sapo Table', type: 'Target table game', markerColor: '#357a45',
    steps: ['Stand at the throwing line.', 'Toss coins or discs toward the scoring table.', "Aim for holes and the frog's mouth for higher points."]
  },
  southAfrica: {
    number: '032 / 034', country: 'South Africa', seal: 'ZA', stamp: 'ZA',
    game: 'Morabaraba', alias: 'A strategy board game where mills allow captures.',
    description: "Traditional strategy board game where players form lines of three pieces to capture an opponent's pieces.",
    preview: 'assets/gh-card.png', title: 'Morabaraba Board', type: 'Strategy board game', markerColor: '#7d6b2b',
    steps: ['Place pieces on board intersections.', 'Form lines of three pieces.', "Capture an opponent's piece when a line is formed."]
  },
  kenya: {
    number: '033 / 034', country: 'Kenya', seal: 'KE', stamp: 'KE',
    game: 'Bao', alias: 'An East African mancala-family strategy game.',
    description: 'East African mancala-family strategy game played using rows of pits and seeds or stones.',
    preview: 'assets/gh-card.png', title: 'Bao Board', type: 'Mancala board game', markerColor: '#7d6b2b',
    steps: ['Choose a pit containing seeds or stones.', 'Sow pieces through the board rows.', 'Capture through counting and board position.']
  },
  egypt: {
    number: '034 / 034', country: 'Egypt', seal: 'EG', stamp: 'EG',
    game: 'Senet', alias: 'An ancient Egyptian board game associated with movement, fate and the afterlife.',
    description: 'Senet is an ancient Egyptian board game played on a grid of thirty squares, with pieces moved according to throw sticks or casting lots.',
    preview: 'assets/vn-preview.png', title: 'Senet Board', type: 'Ancient board game', markerColor: '#a8652d', labelX: '24px', labelY: '-22px',
    steps: ['Set pieces on the thirty-square board.', 'Cast sticks or lots to determine movement.', 'Race pieces through the board while navigating special squares.']
  },
  newZealand: {
    number: '034 / 034', country: 'New Zealand', seal: 'NZ', stamp: 'NZ',
    game: 'Mū Tōrere', alias: 'A traditional Māori strategy game played on an eight-pointed board.',
    description: 'Traditional Māori strategy game played on an eight-pointed board where players attempt to block their opponent.',
    preview: 'assets/jp-card.png', title: 'Mū Tōrere Board', type: 'Strategy board game', markerColor: '#5d77aa', labelX: '-110px',
    steps: ['Place pieces around the eight-pointed board.', 'Move into legal connected points.', 'Win by blocking the opponent from moving.']
  }
};

const cultureNotes = {
  canada: {
    cultureSnapshot: 'Canada blends Indigenous, French, British and many immigrant cultures. Ice hockey, outdoor life and maple traditions are especially iconic.',
    funFact: "🍁 Canada produces most of the world's maple syrup. Pancakes owe Canada a thank-you."
  },
  unitedStates: {
    cultureSnapshot: 'American culture is hugely diverse, with major influences on music, movies, sports and food around the world.',
    funFact: '🍕 Americans eat billions of pizzas each year. Pizza night is basically an institution.'
  },
  mexico: {
    cultureSnapshot: 'Mexican culture is known for colourful celebrations, family traditions, music, food and a rich mixture of Indigenous and Spanish heritage.',
    funFact: '🌮 Mexico has a huge variety of chillies. “Not spicy” is a statement you may want to verify. 🌶️'
  },
  peru: {
    cultureSnapshot: 'Peruvian culture combines Indigenous Andean traditions with Spanish and other influences. Textiles, festivals and food remain important expressions of identity.',
    funFact: '🥔 Peru has thousands of potato varieties. Your supermarket potato aisle suddenly seems very basic.'
  },
  brazil: {
    cultureSnapshot: 'Brazilian culture is famous for music, dance, football, Carnival and diverse Indigenous, African and European influences.',
    funFact: "☕ Brazil is the world's largest coffee producer. Your morning coffee may have started here."
  },
  chile: {
    cultureSnapshot: 'Chilean culture stretches from Andean traditions in the north to distinctive southern and coastal traditions, with music, poetry and food playing important roles.',
    funFact: "🌭 Chile's completo takes a hot dog and absolutely loads it with toppings, including avocado."
  },
  argentina: {
    cultureSnapshot: 'Argentina is strongly associated with tango, football, mate, asado and gaucho traditions.',
    funFact: "⚽ Football is serious business here. Maybe don't start your visit by debating Messi. 👀"
  },
  unitedKingdom: {
    cultureSnapshot: 'British culture mixes centuries-old traditions with modern music, literature, football, pub culture and, of course, tea.',
    funFact: '☕ Britain goes through an enormous number of cups of tea every day. The kettles are fighting for their lives.'
  },
  portugal: {
    cultureSnapshot: 'Portuguese culture is shaped by its Atlantic history, with fado music, community festivals, seafood and decorative azulejo tiles.',
    funFact: '🥧 Portugal gave us the pastel de nata. Ordering “just one” may be your first mistake.'
  },
  finland: {
    cultureSnapshot: 'Finnish culture values nature, simplicity and personal space, while sauna is a particularly beloved tradition.',
    funFact: "☕ Finns are among the world's biggest coffee drinkers per person. Coffee + sauna sounds like a productive afternoon."
  },
  sweden: {
    cultureSnapshot: 'Swedish culture is associated with Scandinavian design, nature and fika: taking time to enjoy coffee and something sweet with others.',
    funFact: '🍰 Sweden basically has a cultural tradition encouraging coffee-and-cake breaks. We approve.'
  },
  italy: {
    cultureSnapshot: 'Italian culture places strong emphasis on family, regional traditions, food, art and social life. Each region has its own distinctive identity.',
    funFact: '🍝 Italy has hundreds of pasta shapes. Yes, choosing the wrong sauce may attract judgement.'
  },
  turkiye: {
    cultureSnapshot: 'Turkish culture sits at a historic crossroads between Europe and Asia, with strong traditions around hospitality, tea, coffee, bazaars and shared meals.',
    funFact: '🍵 Tea arrives in tiny glasses that somehow seem to refill forever.'
  },
  kazakhstan: {
    cultureSnapshot: 'Kazakh culture has deep nomadic roots, with horses, hospitality, traditional music and the yurt holding important cultural significance.',
    funFact: '🐎 Horses have been central to Kazakh life for centuries. Even traditional drinks can involve horse milk!'
  },
  egypt: {
    cultureSnapshot: 'Egyptian culture combines thousands of years of history with modern Arab traditions, family life, music, food and storytelling.',
    funFact: '🤯 Cleopatra lived closer to the Moon landing than to the construction of the Great Pyramid.'
  },
  ghana: {
    cultureSnapshot: 'Ghanaian culture is known for strong community traditions, music, dance, storytelling and colourful textiles such as Kente.',
    funFact: '⚰️ Ghana is famous for incredible fantasy coffins shaped like fish, cars, shoes and other meaningful objects.'
  },
  kenya: {
    cultureSnapshot: 'Kenya is home to many ethnic communities and languages, creating diverse traditions in music, clothing, food and storytelling.',
    funFact: '🏃 Kenya has produced an extraordinary number of world-class distance runners. Your 5K competition is looking scary.'
  },
  southAfrica: {
    cultureSnapshot: "South Africa's many communities create an incredibly diverse mixture of languages, music, cuisine and traditions.",
    funFact: '🗣️ South Africa now has 12 official languages, including South African Sign Language.'
  },
  india: {
    cultureSnapshot: "India's enormous cultural diversity can be seen in its languages, religions, festivals, clothing, music, dance and regional cuisines.",
    funFact: "🥭 India is the world's largest mango producer. Mango season doesn't mess around."
  },
  china: {
    cultureSnapshot: 'Chinese culture has thousands of years of history, with traditions surrounding family, festivals, calligraphy, food and philosophy varying greatly across regions.',
    funFact: '🥠 Plot twist: the fortune cookie most people associate with Chinese restaurants became popular in America, not China.'
  },
  southKorea: {
    cultureSnapshot: 'Korean culture combines long-standing traditions such as hanbok and holiday celebrations with globally influential modern music, film, beauty and food culture.',
    funFact: '🎂 In 2023, South Korea adopted the international age-counting system for most official purposes, making some people effectively a year or two younger on paper.'
  },
  vietnam: {
    cultureSnapshot: 'Vietnamese culture places strong emphasis on family and community, with traditions shaped by regional history, festivals, ancestor remembrance and a huge street-food culture.',
    funFact: '🍜 A bowl of phở in Vietnam can cost only a few Australian dollars. Your stomach AND wallet win.'
  },
  mongolia: {
    cultureSnapshot: "Mongolia's culture is deeply connected to its nomadic heritage, with horses, livestock, gers, traditional wrestling and hospitality remaining important symbols.",
    funFact: '🐴 Mongolia has more horses than people. Horse traffic > car traffic.'
  },
  madagascar: {
    cultureSnapshot: 'Malagasy culture draws on both Austronesian and East African roots, with respect for ancestors, oral poetry and communal ceremony at its centre.',
    funFact: '🦎 Around nine in ten of Madagascar’s plant and animal species live nowhere else on Earth.'
  },
  newZealand: {
    cultureSnapshot: 'New Zealand culture brings together Māori traditions and a multicultural modern society, with strong connections to sport, nature and the outdoors.',
    funFact: '🐑 New Zealand still has several sheep for every person. Finding enough shepherds sounds like the real challenge.'
  },
  japan: {
    cultureSnapshot: 'Japanese culture blends long-standing traditions such as seasonal festivals, tea ceremony and craft with globally influential food, games, fashion and pop culture.',
    funFact: '🍜 Japan has countless regional ramen styles. Picking a favourite may take a lifetime of research.'
  }
};

const countryContinents = {
  canada: 'North America',
  unitedStates: 'North America',
  mexico: 'North America',
  peru: 'South America',
  brazil: 'South America',
  chile: 'South America',
  argentina: 'South America',
  unitedKingdom: 'Europe',
  portugal: 'Europe',
  finland: 'Europe',
  sweden: 'Europe',
  italy: 'Europe',
  turkiye: 'Asia',
  kazakhstan: 'Asia',
  egypt: 'Africa',
  ghana: 'Africa',
  kenya: 'Africa',
  southAfrica: 'Africa',
  india: 'Asia',
  china: 'Asia',
  southKorea: 'Asia',
  vietnam: 'Asia',
  mongolia: 'Asia',
  japan: 'Asia',
  newZealand: 'Oceania'
};

const culturalQuestions = {
  mongolia: {
    question: 'What were Shagai traditionally made from?',
    answers: ['Wood', 'Sheep ankle bones', 'Clay', 'Stone'],
    correctAnswer: 'Sheep ankle bones',
    correctResponse: 'Shagai traditionally use sheep or goat ankle bones.'
  },
  vietnam: {
    question: 'What skill is especially important in Ô Ăn Quan?',
    answers: ['Careful counting', 'Singing loudly', 'Balancing on one foot', 'Drawing maps'],
    correctAnswer: 'Careful counting',
    correctResponse: 'Ô Ăn Quan rewards counting, planning and timing.'
  },
  japan: {
    question: 'What is the shared goal in Kemari?',
    answers: ['Keep the ball in the air', 'Knock down pins', 'Capture seeds', 'Throw bones'],
    correctAnswer: 'Keep the ball in the air',
    correctResponse: 'Kemari is cooperative: players try to keep the ball moving gracefully.'
  },
  ghana: {
    question: 'Oware belongs to which wider family of games?',
    answers: ['Mancala games', 'Card games', 'Ice games', 'Word games'],
    correctAnswer: 'Mancala games',
    correctResponse: 'Oware belongs to the mancala family of sowing and counting games.'
  }
};

Object.assign(countries, atlasEntries);
Object.entries(cultureNotes).forEach(([key, notes]) => {
  if (countries[key]) Object.assign(countries[key], notes);
});
Object.entries(countryContinents).forEach(([key, continent]) => {
  if (countries[key]) countries[key].continent = continent;
});
Object.keys(countries).forEach((key, index, keys) => {
  const c = countries[key];
  const gameChoices = [c.game, 'A modern video game', 'A cooking ritual', 'A festival song'];
  countries[key].id = key;
  countries[key].number = `${String(index + 1).padStart(3, '0')} / ${String(keys.length).padStart(3, '0')}`;
  countries[key].cultureDescription = c.cultureSnapshot || `${c.country} has a rich cultural tradition connected to community, memory and play.`;
  countries[key].gameDescription = c.description;
  countries[key].cardImage = c.cardImage || c.preview || 'assets/vn-card.png';
  countries[key].question = culturalQuestions[key]?.question || `Which traditional game did you discover from ${c.country}?`;
  countries[key].answers = culturalQuestions[key]?.answers || gameChoices;
  countries[key].correctAnswer = culturalQuestions[key]?.correctAnswer || c.game;
  countries[key].correctResponse = culturalQuestions[key]?.correctResponse || `${c.game} is the traditional game connected to ${c.country} in this archive.`;
});

/* =========================================================
   FULL JOURNEY DATA — welcome / name / intro / lore
   ========================================================= */
const journey = {
  mongolia: {
    country: 'Mongolia', code: 'MN', game: 'Shagai',
    welcomeIntro: 'Shagai are the anklebones of sheep, used for centuries across the Mongolian steppe for games, fortune-telling and teaching children to count and observe.',
    prompt: 'Before you begin, discover how your name appears in Mongolian.',
    illustration: '✦',
    nameHeading: 'How does your name look in Mongolian?',
    scriptLabel: 'Mongolian Cyrillic (stylised transliteration)',
    transliterate: latinToMongolianCyrillic,
    introSummary: 'Four anklebones, four possible landings, and a line of bones to race along. Learn what each position means before your first cast.',
    positions: [
      { icon: '𝍫', name: 'Horse', meaning: 'The only face that moves a rider — one stone along the course for every horse that lands face up.' },
      { icon: '𝍪', name: 'Camel', meaning: 'A steady, enduring position — associated with resilience over a long journey, but it carries no rider forward.' },
      { icon: '𝍩', name: 'Sheep', meaning: 'The most common landing — associated with gentleness and the everyday.' },
      { icon: '𝍨', name: 'Goat', meaning: 'Considered the least favourable of the four — associated with caution.' }
    ],
    metaCards: [
      { icon: '◈', title: 'Equipment', text: 'Four dried sheep anklebones (shagai), sometimes painted or dyed.' },
      { icon: '◈', title: 'How to play', text: 'Race along a line of anklebones: cast all four bones in turn and move your horse by the faces that land up.' },
      { icon: '◈', title: 'Cultural meaning', text: 'Used in games, teaching and divination across Mongolian herding communities. [Illustrative — verify with cultural sources.]' }
    ],
    fact: 'Shagai (anklebones) have been used across the Mongolian steppe for centuries in games, divination and teaching children to count. [Placeholder — verify specifics with cultural sources.]',
    takeaway: 'A short reflection: across cultures, simple objects — bones, seeds, shells — became tools for chance, memory and connection.',
    hasFullGame: true,
    externalGame: 'game3.html'
  },
  madagascar: {
    country: 'Madagascar', code: 'MG', game: 'Fanorona',
    welcomeIntro: 'Fanorona is Madagascar’s national board game — a duel of lines and sweeps played on a nine-by-five grid, recorded in the Merina highlands for centuries.',
    prompt: 'Before you begin, see a stylised rendering of your name.',
    illustration: '✧',
    nameHeading: 'A stylised rendering of your name',
    scriptLabel: 'Illustrative phonetic rendering (not a formal transliteration)',
    transliterate: phoneticRespell,
    introSummary: 'Twenty-two stones each, one empty centre, and two opposite ways to capture. Learn the moves before your first sweep.',
    positions: [
      { icon: '◈', name: 'Approach', meaning: 'Move a stone towards an enemy line — every enemy stone continuing in that direction is captured.' },
      { icon: '◇', name: 'Withdrawal', meaning: 'Move a stone away from an enemy line — the line you stepped back from is captured instead.' },
      { icon: '✧', name: 'Chain', meaning: 'A capturing stone may keep moving while each new move captures, without repeating a direction or a point.' },
      { icon: '○', name: 'Paika', meaning: 'A quiet, non-capturing move — legal only when no capture is available anywhere on the board.' }
    ],
    metaCards: [
      { icon: '◈', title: 'Equipment', text: 'A nine-by-five board of lines and diagonals, with twenty-two stones for each player.' },
      { icon: '◈', title: 'How to play', text: 'Capture by approach or withdrawal along a line, chaining moves while captures remain, until one side has no stones left.' },
      { icon: '◈', title: 'Cultural meaning', text: 'Fanorona carries a long association with the Merina court and appears in Malagasy oral history as a game of counsel and strategy. [Illustrative — verify with cultural sources.]' }
    ],
    fact: 'Fanorona has been played in Madagascar for centuries and is often described as its national board game. [Placeholder — verify specifics with cultural sources.]',
    takeaway: 'A short reflection: a board of lines and stones can hold as much strategy, memory and rivalry as any game built from bones or seeds.',
    hasFullGame: true,
    externalGame: 'game2.html'
  },
  vietnam: {
    country: 'Vietnam', code: 'VN', game: 'Ô Ăn Quan',
    welcomeIntro: 'Ô Ăn Quan is a counting and capturing game played on a simple earthen or paper board, passed between generations of Vietnamese children.',
    prompt: 'Before you begin, discover how your name appears in Vietnamese.',
    illustration: '越',
    nameHeading: 'How does your name look in Vietnamese?',
    scriptLabel: 'Vietnamese diacritics (decorative, not an authentic equivalent)',
    transliterate: decorateVietnamese,
    introSummary: 'A board of small fields, a handful of seeds, and careful counting — this exhibit is still being prepared.',
    positions: [],
    metaCards: [
      { icon: '◈', title: 'Equipment', text: 'A board of ten small fields and two larger “quan” fields, with stones or seeds.' },
      { icon: '◈', title: 'How to play', text: 'Sow seeds field by field, capturing where a field is left with exactly two.' },
      { icon: '◈', title: 'Cultural meaning', text: 'A game of patience and mental arithmetic played across generations in Vietnam.' }
    ],
    fact: 'Ô Ăn Quan has long been played by children across Vietnam using stones, seeds or tamarind pips. [Placeholder — verify specifics with cultural sources.]',
    takeaway: 'This full playable exhibit is still being prepared — thank you for visiting the archive entry.',
    hasFullGame: false
  },
  japan: {
    country: 'Japan', code: 'JP', game: 'Kemari',
    welcomeIntro: 'Kemari is a cooperative, ceremonial ball game associated with Japan’s imperial court, where grace mattered more than winning.',
    prompt: 'Before you begin, discover how your name appears in Japanese.',
    illustration: '日',
    nameHeading: 'How does your name look in Japanese?',
    scriptLabel: 'Katakana (approximate phonetic rendering)',
    transliterate: romajiToKatakana,
    introSummary: 'A quiet, ceremonial ball game kept aloft by cooperation — this exhibit is still being prepared.',
    positions: [],
    metaCards: [
      { icon: '◈', title: 'Equipment', text: 'A deerskin ball (mari) and a marked circle of participants.' },
      { icon: '◈', title: 'How to play', text: 'Players keep the ball airborne together using controlled kicks, without competing.' },
      { icon: '◈', title: 'Cultural meaning', text: 'Historically associated with Japan’s Heian-era imperial court and courtly refinement.' }
    ],
    fact: 'Kemari is documented as a courtly pastime in Japan for over a thousand years. [Placeholder — verify specifics with cultural sources.]',
    takeaway: 'This full playable exhibit is still being prepared — thank you for visiting the archive entry.',
    hasFullGame: false
  },
  ghana: {
    country: 'Ghana', code: 'GH', game: 'Oware',
    welcomeIntro: 'Oware is a sowing and capturing game from the mancala family, played socially across West Africa for generations.',
    prompt: 'Before you begin, discover a stylised rendering of your name.',
    illustration: '✦',
    nameHeading: 'A stylised rendering of your name',
    scriptLabel: 'Illustrative phonetic rendering (not a formal transliteration)',
    transliterate: phoneticRespell,
    introSummary: 'Seeds, pits, and careful sowing — this exhibit is still being prepared.',
    positions: [],
    metaCards: [
      { icon: '◈', title: 'Equipment', text: 'A wooden board of twelve pits, plus stores, and 48 seeds or small stones.' },
      { icon: '◈', title: 'How to play', text: 'Sow seeds counter-clockwise from a chosen pit, capturing under set conditions.' },
      { icon: '◈', title: 'Cultural meaning', text: 'Played socially and taught directly across generations throughout West Africa.' }
    ],
    fact: 'Oware belongs to the wider mancala family of games found across Africa and parts of Asia. [Placeholder — verify specifics with cultural sources.]',
    takeaway: 'This full playable exhibit is still being prepared — thank you for visiting the archive entry.',
    hasFullGame: false
  }
};

Object.entries(atlasEntries).forEach(([key, c]) => {
  journey[key] = {
    country: c.country,
    code: c.stamp,
    game: c.game,
    welcomeIntro: c.description,
    prompt: `Before you begin, add your name to the ${c.country} archive passport.`,
    illustration: c.seal,
    nameHeading: `A visitor passport for ${c.country}`,
    scriptLabel: 'Visitor name rendering (prototype)',
    transliterate: phoneticRespell,
    introSummary: c.alias,
    positions: [],
    metaCards: [
      { icon: '◈', title: 'Equipment', text: c.title },
      { icon: '◈', title: 'How to play', text: c.steps.join(' ') },
      { icon: '◈', title: 'Cultural meaning', text: `${c.game} is represented here as part of ${c.country}'s living play traditions.` }
    ],
    fact: `${c.description} [Prototype archive entry — verify details with cultural sources before publication.]`,
    takeaway: `You explored ${c.game} from ${c.country}. This archive entry can later be expanded into a playable mini-game.`,
    hasFullGame: false
  };
});

/* =========================================================
   Stylised name transliteration helpers (illustrative only)
   ========================================================= */
function latinToMongolianCyrillic(name) {
  const map = { a:'а',b:'б',c:'к',d:'д',e:'э',f:'ф',g:'г',h:'х',i:'и',j:'ж',k:'к',l:'л',m:'м',n:'н',o:'о',p:'п',q:'к',r:'р',s:'с',t:'т',u:'у',v:'в',w:'в',x:'кс',y:'й',z:'з' };
  return name.split('').map(ch => {
    const lower = ch.toLowerCase();
    if (!/[a-z]/.test(lower)) return ch;
    const mapped = map[lower] || lower;
    return ch === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1);
  }).join('');
}

function romajiToKatakana(name) {
  const digraphs = { th:'ス', sh:'シ', ch:'チ', ph:'フ', ck:'ク' };
  const vowels = { a:'ア', e:'エ', i:'イ', o:'オ', u:'ウ' };
  const consonants = { b:'バ',c:'カ',d:'ダ',f:'ファ',g:'ガ',h:'ハ',j:'ジャ',k:'カ',l:'ラ',m:'マ',n:'ン',p:'パ',q:'ク',r:'ラ',s:'サ',t:'タ',v:'ヴァ',w:'ワ',x:'クス',y:'ヤ',z:'ザ' };
  let out = '';
  const s = name.toLowerCase().replace(/[^a-z]/g, '');
  for (let i = 0; i < s.length; i++) {
    const two = s.slice(i, i + 2);
    if (digraphs[two]) { out += digraphs[two]; i++; continue; }
    const ch = s[i];
    if (vowels[ch]) { out += vowels[ch]; continue; }
    out += consonants[ch] || '';
  }
  return out || 'ー';
}

function decorateVietnamese(name) {
  const marks = ['', '̀', '́', '̉', '̃', '̣'];
  return name.split('').map((ch, i) => /[a-zA-Z]/.test(ch) && /[aeiouAEIOU]/.test(ch) ? ch + marks[i % marks.length] : ch).join('');
}

function phoneticRespell(name) {
  const map = { c:'k', qu:'kw', x:'z', th:'t', ph:'f' };
  let s = name.toLowerCase();
  Object.entries(map).forEach(([k, v]) => { s = s.split(k).join(v); });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* =========================================================
   SCREEN ROUTER
   ========================================================= */
let activeScreen = 'home';
let selectedCountry = 'mongolia';
let selectedMode = 'solo';
const completedCountries = new Set();
const journeyStorageKey = 'gamesAcrossTimeJourney';
let discoveryRecords = {};
let pendingCardCountry = null;
let unlockTimer = null;
const certificateCountries = ['vietnam', 'mongolia', 'japan', 'ghana'];
let certificatePending = false;
let certificateShown = false;
const screenNavGroup = {
  intro: null,
  home: 'home',
  worldmap: 'worldmap',
  collection: 'collection',
  summary: 'collection',
  welcome: 'cultures',
  name: 'cultures',
  gameintro: 'games',
  game: 'games',
  complete: null,
  question: null
};

function visibleCountryKeys() {
  if (typeof mapLocations === 'undefined' || typeof hiddenMapCountries === 'undefined') return Object.keys(countries);
  return Object.keys(mapLocations).filter(key => countries[key] && !hiddenMapCountries.has(key));
}

function discoveredKeys() {
  return visibleCountryKeys().filter(key => completedCountries.has(key));
}

function saveJourneyProgress() {
  const payload = { completed: [...completedCountries], records: discoveryRecords };
  localStorage.setItem(journeyStorageKey, JSON.stringify(payload));
}

function loadJourneyProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(journeyStorageKey) || '{}');
    const valid = new Set(visibleCountryKeys());
    (saved.completed || []).forEach(key => {
      if (valid.has(key)) completedCountries.add(key);
    });
    discoveryRecords = Object.fromEntries(Object.entries(saved.records || {}).filter(([key]) => valid.has(key)));
  } catch {
    completedCountries.clear();
    discoveryRecords = {};
  }
}

function resetJourneyProgress() {
  completedCountries.clear();
  discoveryRecords = {};
  pendingCardCountry = null;
  certificatePending = false;
  certificateShown = false;
  localStorage.removeItem(journeyStorageKey);
  updateCompletionMarkers();
  renderCollection();
  closeCertificate();
  closeCardUnlock();
  showScreen('intro', { instant: true });
}

function showScreen(name, opts = {}) {
  activeScreen = name;
  document.body.classList.toggle('intro-active', name === 'intro');
  if (name === 'intro') {
    const panel = q('#leaderboardPanel');
    if (panel) panel.hidden = true;
    runIntroStats();
  }
  const shell = q('.app-shell');
  if (!opts.instant && shell) {
    shell.classList.remove('route-changing');
    void shell.offsetWidth;
    shell.classList.add('route-changing');
    window.setTimeout(() => shell.classList.remove('route-changing'), 650);
  }
  qa('.screen').forEach(s => s.classList.toggle('active', s.dataset.screen === name));
  if (name === 'worldmap') {
    requestAnimationFrame(() => {
      updateJourneyCounter();
      initLeafletMap();
      if (leafletMap) {
        leafletMap.invalidateSize();
        if (!previewCountry) leafletMap.setView(mapCenter, 2);
      }
      maybeShowCertificate();
    });
  } else if (name === 'collection') {
    renderCollection();
  } else if (name === 'summary') {
    renderJourneySummary();
  } else {
    closeAtlasPreview();
  }
  const activeNav = screenNavGroup[name] || name;
  qa('.nav-item').forEach(el => {
    const key = el.dataset.nav || el.dataset.scroll;
    el.classList.toggle('active', Boolean(activeNav) && key === activeNav);
  });
  window.scrollTo({ top: 0, behavior: opts.instant ? 'auto' : 'smooth' });
}

function updateCompletionMarkers() {
  qa('[data-country]').forEach(el => {
    const isComplete = completedCountries.has(el.dataset.country);
    el.classList.toggle('completed', isComplete);
    if (el.classList.contains('map-pin')) {
      const country = countries[el.dataset.country];
      const status = isComplete ? 'completed' : 'not completed';
      el.setAttribute('aria-label', `${country.country}, ${country.game}, ${status}. Explore`);
    }
  });

  const status = q('#atlasStatus');
  if (status) {
    status.textContent = completedCountries.size
      ? t('passportStamped', { countries: [...completedCountries].map(key => countries[key].country).join(', ') })
      : t('noStamps');
  }
  updateJourneyCounter();
  refreshLeafletMarkers();
}

/* =========================================================
   INTRO — pre-home game entry
   ========================================================= */
const introTranslations = {
  en: {
    title: 'Culture Game',
    navHow: 'How it works',
    navModes: 'Modes',
    navLeaderboard: 'Leaderboard',
    languageLabel: 'Language',
    welcome: 'Welcome, cultural traveller · Personal best —',
    copy: 'Enter a living archive of traditional play, explore cultures through games, and collect passport stamps as you learn.',
    plays: 'Plays',
    duels: 'Duels',
    worldRecord: 'World record',
    solo: 'Solo',
    soloSmall: 'Begin the archive journey',
    duel: 'Duel',
    duelSmall: 'Prototype challenge mode',
    viewLeaderboard: 'View Leaderboard',
    howOneTitle: 'Select a culture',
    howOneText: 'Use the atlas to choose a marked country.',
    howTwoTitle: 'Learn the tradition',
    howTwoText: 'Read the archive entry and receive a passport card.',
    howThreeTitle: 'Play the game',
    howThreeText: 'Try the Shagai showcase and collect a stamp.',
    boardTitle: 'Global archive ranking',
    closeLeaderboard: 'Close leaderboard',
    chooseLanguage: 'Choose language',
    explore: 'Explore',
    completed: 'completed',
    notCompleted: 'not completed'
  },
  ja: {
    title: 'カルチャーゲーム',
    navHow: '遊び方',
    navModes: 'モード',
    navLeaderboard: 'ランキング',
    languageLabel: '言語',
    welcome: 'ようこそ、文化の旅人 · 自己ベスト —',
    copy: '伝統的な遊びの生きたアーカイブに入り、ゲームを通して文化を探索し、学びながらパスポートスタンプを集めましょう。',
    plays: 'プレイ数',
    duels: '対戦数',
    worldRecord: '世界記録',
    solo: 'ソロ',
    soloSmall: 'アーカイブの旅を始める',
    duel: 'デュエル',
    duelSmall: 'プロトタイプ対戦モード',
    viewLeaderboard: 'ランキングを見る',
    howOneTitle: '文化を選ぶ',
    howOneText: 'アトラスで印のある国を選びます。',
    howTwoTitle: '伝統を学ぶ',
    howTwoText: 'アーカイブ記事を読み、パスポートカードを受け取ります。',
    howThreeTitle: 'ゲームを遊ぶ',
    howThreeText: 'シャガイ展示を体験し、スタンプを集めます。',
    boardTitle: 'グローバルアーカイブランキング',
    closeLeaderboard: 'ランキングを閉じる',
    chooseLanguage: '言語を選択',
    explore: '探索',
    completed: '完了',
    notCompleted: '未完了'
  },
  vi: {
    title: 'Trò Chơi Văn Hóa',
    navHow: 'Cách chơi',
    navModes: 'Chế độ',
    navLeaderboard: 'Bảng xếp hạng',
    languageLabel: 'Ngôn ngữ',
    welcome: 'Chào mừng nhà du hành văn hóa · Thành tích tốt nhất —',
    copy: 'Bước vào kho lưu trữ sống của trò chơi truyền thống, khám phá văn hóa qua trò chơi và sưu tầm dấu hộ chiếu khi học.',
    plays: 'Lượt chơi',
    duels: 'Đấu tay đôi',
    worldRecord: 'Kỷ lục thế giới',
    solo: 'Chơi đơn',
    soloSmall: 'Bắt đầu hành trình lưu trữ',
    duel: 'Đấu',
    duelSmall: 'Chế độ thử thách mẫu',
    viewLeaderboard: 'Xem bảng xếp hạng',
    howOneTitle: 'Chọn một nền văn hóa',
    howOneText: 'Dùng bản đồ để chọn quốc gia được đánh dấu.',
    howTwoTitle: 'Tìm hiểu truyền thống',
    howTwoText: 'Đọc mục lưu trữ và nhận thẻ hộ chiếu.',
    howThreeTitle: 'Chơi trò chơi',
    howThreeText: 'Thử phần trưng bày Shagai và nhận dấu.',
    boardTitle: 'Xếp hạng lưu trữ toàn cầu',
    closeLeaderboard: 'Đóng bảng xếp hạng',
    chooseLanguage: 'Chọn ngôn ngữ',
    explore: 'Khám phá',
    completed: 'đã hoàn thành',
    notCompleted: 'chưa hoàn thành'
  },
  zh: {
    title: '文化游戏',
    navHow: '玩法介绍',
    navModes: '模式',
    navLeaderboard: '排行榜',
    languageLabel: '语言',
    welcome: '欢迎回来，文化旅人 · 个人最佳 —',
    copy: '进入传统游戏的活态档案，通过游戏探索文化，并在学习中收集护照印章。',
    plays: '游玩次数',
    duels: '对战次数',
    worldRecord: '世界纪录',
    solo: '单人',
    soloSmall: '开始档案旅程',
    duel: '对战',
    duelSmall: '原型挑战模式',
    viewLeaderboard: '查看排行榜',
    howOneTitle: '选择文化',
    howOneText: '使用地图选择已标记的国家。',
    howTwoTitle: '了解传统',
    howTwoText: '阅读档案条目并领取护照卡。',
    howThreeTitle: '体验游戏',
    howThreeText: '尝试沙嘎展示并收集印章。',
    boardTitle: '全球档案排名',
    closeLeaderboard: '关闭排行榜',
    chooseLanguage: '选择语言',
    explore: '探索',
    completed: '已完成',
    notCompleted: '未完成'
  },
  ko: {
    title: '문화 게임',
    navHow: '이용 방법',
    navModes: '모드',
    navLeaderboard: '리더보드',
    languageLabel: '언어',
    welcome: '문화 여행자님, 환영합니다 · 개인 최고 기록 —',
    copy: '전통 놀이의 살아 있는 아카이브에 들어가 게임을 통해 문화를 탐험하고, 배워 가며 여권 스탬프를 모아 보세요.',
    plays: '플레이',
    duels: '대결',
    worldRecord: '세계 기록',
    solo: '솔로',
    soloSmall: '아카이브 여정 시작',
    duel: '듀얼',
    duelSmall: '프로토타입 도전 모드',
    viewLeaderboard: '리더보드 보기',
    howOneTitle: '문화 선택',
    howOneText: '지도에서 표시된 국가를 선택하세요.',
    howTwoTitle: '전통 배우기',
    howTwoText: '아카이브 항목을 읽고 여권 카드를 받으세요.',
    howThreeTitle: '게임 플레이',
    howThreeText: '샤가이 전시를 체험하고 스탬프를 모으세요.',
    boardTitle: '글로벌 아카이브 순위',
    closeLeaderboard: '리더보드 닫기',
    chooseLanguage: '언어 선택',
    explore: '탐험',
    completed: '완료',
    notCompleted: '미완료'
  }
};

const sharedTranslations = {
  en: {
    sideHome: 'Home', sideMap: 'Map', sideGames: 'Games', sideCultures: 'Cultures', sideCollection: 'My Collection', changeSettings: 'Change player setting', sidebarQuote: '“Play is the oldest language that connects us all.”',
    homeEyebrow: 'A living archive of traditional play', aboutProject: 'About the project', homeKicker: 'ONE WORLD · MANY CULTURES · COUNTLESS GAMES', homeTitle: 'Games Across Time',
    homeCopy: 'Trace the games that travelled through generations. Explore the objects, stories and rituals that still connect people today.',
    interactiveAtlas: 'Interactive atlas', enterAtlas: 'Enter the full atlas ↗', featuredCollection: 'Featured collection', fourGames: 'Four games. Four histories.', prototypeCollection: 'Prototype collection',
    archiveEntry: 'ARCHIVE ENTRY', selectedCountry: 'Selected country', traditionalGame: 'Traditional game', gamePreview: 'Game preview', howPlayed: 'How it is played', whyMatters: 'Why it matters', beginJourney: 'Begin the journey',
    cultureSnapshot: 'Culture snapshot', funFact: 'Fun fact', gameDescription: 'Game description',
    connectionKicker: 'THE CONNECTION', connectionTitle: 'The rules change. The instinct to play does not.', connectionCopy: 'Compare how strategy, ritual and community appear in games created thousands of kilometres apart.',
    journeyTime: 'A journey through time', past: 'PAST', origins: 'Origins', originsCopy: 'Where the game emerged and what materials people used.', then: 'THEN', tradition: 'Tradition', traditionCopy: 'How families, communities and ceremonies kept it alive.', now: 'NOW', connection: 'Connection', nowCopy: 'See the game through video, animation and a digital 3D artefact.',
    footerCopy: 'Built for cultural connection · Hackathon prototype', mapEyebrow: 'The interactive atlas', returnArchive: '← Return to archive', selectTerritory: 'SELECT A MARKED TERRITORY', mapInstruction: 'Hover to preview · click to travel into a culture',
    yourJourney: 'YOUR JOURNEY', culturesDiscovered: 'CULTURES DISCOVERED', finishJourney: 'Finish Journey',
    noStamps: 'No passport stamps recorded yet.', passportStamped: 'Passport stamped: {countries}', soloStatus: 'Solo mode selected: explore the archive at your own pace.', duelStatus: 'Duel mode selected: choose a culture to begin the challenge.', selectedStatus: '{country} selected: read the introduction, then join the game.',
    object: 'Object', type: 'Type', joinGame: 'Join Game', continue: 'Continue', backAtlas: '← Back to the atlas', yourPassport: 'YOUR CULTURAL PASSPORT', enterName: 'Enter your name', revealName: 'Reveal my name',
    nameLabel: 'Name', countryLabel: 'Country', scriptLabel: 'Script', beginGame: 'Begin the Game', howToPlay: 'HOW TO PLAY', exitExhibit: '← Exit exhibit', objectViewer: 'Object viewer', dragRotate: 'Drag to rotate', resetView: 'Reset view',
    material: 'Material', significance: 'Significance', shagaiObject: 'Shagai · sheep anklebone', shagaiMaterial: 'Bone, sometimes dyed or weighted', shagaiSignificance: 'Used in games, divination and teaching across the Mongolian steppe.',
    theThrow: 'The throw', throwShagai: 'Throw the Shagai', interpretation: 'Interpretation', yourResult: 'Your result', fortune: 'Fortune', historicalNote: 'Historical note', finishStamp: 'Finish & collect stamp',
    archiveComplete: 'ARCHIVE COMPLETE', gameCompleted: 'Game completed', dateLabel: 'Date', exploreAnother: 'Explore another country', returnWorldMap: 'Return to World Map', continueQuestion: 'Continue to cultural question',
    ideaKicker: 'THE IDEA', ideaTitle: 'We do not just archive games. We let people encounter them.', ideaCopy: 'Games Across Time uses an interactive map, short documentary clips, animated rules and digital 3D artefacts to turn cultural history into something visitors can explore rather than simply read.',
    culturalIntro: 'CULTURAL INTRODUCTION', welcomeTo: 'Welcome to {country}', countryIntro: '{game} is a traditional game from {country}. This archive entry introduces how it is played, the objects around it and why people still remember it.',
    countryPrompt: 'Before you begin, add your name to the {country} archive passport.', visitorPassport: 'A visitor passport for {country}', visitorScript: 'Visitor name rendering (prototype)', passportLede: 'Your name in {country} style looks like:', beforePlay: '{country} · {game}',
    introSummaryGeneric: 'Learn the main idea of {game} before entering the archive.', equipment: 'Equipment', howToPlayCard: 'How to play', culturalMeaning: 'Cultural meaning', culturalMeaningText: '{game} is represented here as part of {country}’s living play traditions.', fullGame: 'Enter the Exhibit', archiveEntryAction: 'View Archive Entry',
    awaitingThrow: 'Awaiting your throw', throwHint: 'Click to cast all four anklebones onto the felt.', tumbling: 'The bones are tumbling…', loreDefault: 'Throw the Shagai to see a traditional-style interpretation of your result. Interpretations shown here are illustrative and simplified for this prototype.',
    completeTitle: 'You have experienced {game} — {country}.', takeaway: 'You explored {game} from {country}. This archive entry can later be expanded into a playable mini-game.', videoCaption: 'Watch {game} being played', videoPlaying: 'Demo video placeholder · replace with your MP4',
    stepCount: 'Step {current} / {total}', previousStep: 'Previous step', nextStep: 'Next step',
    beforeTravel: 'BEFORE YOU TRAVEL ON...', collectCard: 'Collect your card', correct: 'Correct', notQuite: 'Not quite', cardDiscovered: 'CULTURAL CARD DISCOVERED', didYouKnow: 'DID YOU KNOW?',
    collectionEyebrow: 'THE CULTURAL ARCHIVE', collectionTitle: "Games you've discovered across the world.", discovered: 'DISCOVERED', undiscovered: 'UNDISCOVERED', exploreAction: 'Explore →', viewCollection: 'View My Collection',
    summaryKicker: 'YOUR JOURNEY ACROSS TIME', summaryTitle: 'You explored:', summaryCountries: 'Countries', summaryGames: 'Traditional games', summaryContinents: 'Continents', yourDiscoveries: 'YOUR DISCOVERIES', summaryQuote: 'Every game tells a story. Thanks for travelling across time.', exploreMore: 'Explore More', startNewJourney: 'Start a New Journey',
    certificateKicker: 'CONGRATULATIONS', certificateTitle: 'Congratulations, you have completed all of the culture games in the world.', continueExploring: 'Continue exploring', closeCertificate: 'Close certificate'
  },
  ja: {
    sideHome: 'ホーム', sideMap: '地図', sideGames: 'ゲーム', sideCultures: '文化', changeSettings: 'プレイヤー設定を変更', sidebarQuote: '「遊びは、私たちをつなぐ最も古い言葉です。」',
    homeEyebrow: '伝統的な遊びの生きたアーカイブ', aboutProject: 'プロジェクトについて', homeKicker: '一つの世界 · 多くの文化 · 数えきれないゲーム', homeTitle: '時を越えるゲーム',
    homeCopy: '世代を越えて伝わったゲームをたどり、今も人々をつなぐ物語や儀式を探索します。',
    interactiveAtlas: 'インタラクティブ地図', enterAtlas: '地図を開く ↗', featuredCollection: '注目コレクション', fourGames: '4つのゲーム。4つの歴史。', prototypeCollection: 'プロトタイプコレクション',
    archiveEntry: 'アーカイブ項目', selectedCountry: '選択中の国', traditionalGame: '伝統ゲーム', gamePreview: 'ゲームプレビュー', howPlayed: '遊び方', whyMatters: '大切な理由', beginJourney: '旅を始める',
    cultureSnapshot: '文化スナップショット', funFact: '豆知識', gameDescription: 'ゲーム説明',
    connectionKicker: 'つながり', connectionTitle: 'ルールは変わっても、遊ぶ心は変わらない。', connectionCopy: '遠く離れた地域のゲームに現れる戦略、儀式、共同体を比べます。',
    journeyTime: '時間をたどる旅', past: '過去', origins: '起源', originsCopy: 'ゲームが生まれた場所と使われた素材。', then: '伝統', tradition: '継承', traditionCopy: '家族や地域がどのように守ってきたか。', now: '現在', connection: 'つながり', nowCopy: '映像、アニメーション、3D資料でゲームを見ます。',
    footerCopy: '文化的なつながりのためのプロトタイプ', mapEyebrow: 'インタラクティブ地図', returnArchive: '← アーカイブへ戻る', selectTerritory: '印のある地域を選択', mapInstruction: 'ホバーでプレビュー · クリックで文化へ移動',
    noStamps: 'まだスタンプはありません。', passportStamped: 'スタンプ済み: {countries}', soloStatus: 'ソロモード: 自分のペースで探索します。', duelStatus: 'デュエルモード: 文化を選んで始めます。', selectedStatus: '{country} を選択しました。説明を読んでゲームに参加できます。',
    object: 'オブジェクト', type: '種類', joinGame: 'ゲームに参加', continue: '続ける', backAtlas: '← 地図へ戻る', yourPassport: '文化パスポート', enterName: '名前を入力', revealName: '名前を表示',
    nameLabel: '名前', countryLabel: '国', scriptLabel: '表記', beginGame: 'ゲームを始める', howToPlay: '遊び方', exitExhibit: '← 展示を出る', objectViewer: 'オブジェクトビューア', dragRotate: 'ドラッグで回転', resetView: '表示をリセット',
    material: '素材', significance: '意味', shagaiObject: 'シャガイ · 羊のくるぶし骨', shagaiMaterial: '骨。染色や重み付けされることもある', shagaiSignificance: 'モンゴル草原でゲーム、占い、学習に使われてきました。',
    theThrow: '投げる', throwShagai: 'シャガイを投げる', interpretation: '解釈', yourResult: '結果', fortune: '運勢', historicalNote: '歴史メモ', finishStamp: '終了してスタンプを集める',
    archiveComplete: 'アーカイブ完了', gameCompleted: '完了したゲーム', dateLabel: '日付', exploreAnother: '別の国を探索', returnWorldMap: '世界地図へ戻る',
    ideaKicker: 'アイデア', ideaTitle: '私たちはゲームを保存するだけでなく、出会える形にします。', ideaCopy: 'インタラクティブ地図、短い映像、アニメーション、3D資料で文化史を体験できます。',
    culturalIntro: '文化紹介', welcomeTo: '{country} へようこそ', countryIntro: '{game} は {country} の伝統ゲームです。この項目では遊び方、道具、文化的な意味を紹介します。',
    countryPrompt: '始める前に、{country} のアーカイブパスポートに名前を入れましょう。', visitorPassport: '{country} の訪問者パスポート', visitorScript: '訪問者名の表示（プロトタイプ）', passportLede: '{country} 風の名前表示:', beforePlay: '{country} · {game}',
    introSummaryGeneric: '{game} の基本を学んでからアーカイブに入ります。', equipment: '道具', howToPlayCard: '遊び方', culturalMeaning: '文化的意味', culturalMeaningText: '{game} は {country} の遊びの伝統としてここに紹介されています。', fullGame: '展示に入る', archiveEntryAction: 'アーカイブ項目を見る',
    awaitingThrow: '投げるのを待っています', throwHint: 'クリックして4つのシャガイをフェルトに投げます。', tumbling: '骨が転がっています…', loreDefault: 'シャガイを投げると、伝統風の解釈が表示されます。これはプロトタイプ用の簡略表現です。',
    completeTitle: '{country} の {game} を体験しました。', takeaway: '{country} の {game} を探索しました。この項目は後でプレイ可能なミニゲームに拡張できます。', videoCaption: '{game} のプレイを見る', videoPlaying: 'デモ動画プレースホルダー · MP4に置き換え',
    stepCount: 'ステップ {current} / {total}', previousStep: '前のステップ', nextStep: '次のステップ',
    certificateKicker: 'おめでとうございます', certificateTitle: 'おめでとうございます。世界の文化ゲームをすべて完了しました。', continueExploring: '探索を続ける', closeCertificate: '証明書を閉じる'
  },
  vi: {
    sideHome: 'Trang chủ', sideMap: 'Bản đồ', sideGames: 'Trò chơi', sideCultures: 'Văn hóa', changeSettings: 'Đổi cài đặt người chơi', sidebarQuote: '“Vui chơi là ngôn ngữ lâu đời nhất kết nối tất cả chúng ta.”',
    homeEyebrow: 'Kho lưu trữ sống của trò chơi truyền thống', aboutProject: 'Về dự án', homeKicker: 'MỘT THẾ GIỚI · NHIỀU VĂN HÓA · VÔ SỐ TRÒ CHƠI', homeTitle: 'Trò Chơi Qua Thời Gian',
    homeCopy: 'Theo dấu những trò chơi đi qua nhiều thế hệ. Khám phá đồ vật, câu chuyện và nghi lễ vẫn kết nối con người hôm nay.',
    interactiveAtlas: 'Bản đồ tương tác', enterAtlas: 'Vào bản đồ đầy đủ ↗', featuredCollection: 'Bộ sưu tập nổi bật', fourGames: 'Bốn trò chơi. Bốn lịch sử.', prototypeCollection: 'Bộ sưu tập mẫu',
    archiveEntry: 'MỤC LƯU TRỮ', selectedCountry: 'Quốc gia đã chọn', traditionalGame: 'Trò chơi truyền thống', gamePreview: 'Xem trước trò chơi', howPlayed: 'Cách chơi', whyMatters: 'Vì sao quan trọng', beginJourney: 'Bắt đầu hành trình',
    cultureSnapshot: 'Ảnh chụp văn hóa', funFact: 'Sự thật thú vị', gameDescription: 'Mô tả trò chơi',
    connectionKicker: 'SỰ KẾT NỐI', connectionTitle: 'Luật chơi thay đổi. Bản năng chơi thì không.', connectionCopy: 'So sánh chiến thuật, nghi lễ và cộng đồng trong các trò chơi cách xa nhau hàng nghìn cây số.',
    journeyTime: 'Hành trình qua thời gian', past: 'QUÁ KHỨ', origins: 'Nguồn gốc', originsCopy: 'Nơi trò chơi xuất hiện và vật liệu được dùng.', then: 'KHI XƯA', tradition: 'Truyền thống', traditionCopy: 'Gia đình và cộng đồng đã gìn giữ như thế nào.', now: 'HIỆN NAY', connection: 'Kết nối', nowCopy: 'Xem trò chơi qua video, hoạt ảnh và hiện vật 3D.',
    footerCopy: 'Xây dựng cho kết nối văn hóa · Bản mẫu hackathon', mapEyebrow: 'Bản đồ tương tác', returnArchive: '← Quay lại lưu trữ', selectTerritory: 'CHỌN VÙNG ĐƯỢC ĐÁNH DẤU', mapInstruction: 'Di chuột để xem trước · bấm để vào văn hóa',
    noStamps: 'Chưa có dấu hộ chiếu.', passportStamped: 'Đã đóng dấu: {countries}', soloStatus: 'Chế độ chơi đơn: khám phá theo nhịp của bạn.', duelStatus: 'Chế độ đấu: chọn một văn hóa để bắt đầu thử thách.', selectedStatus: 'Đã chọn {country}: đọc giới thiệu rồi tham gia trò chơi.',
    object: 'Hiện vật', type: 'Loại', joinGame: 'Tham gia trò chơi', continue: 'Tiếp tục', backAtlas: '← Quay lại bản đồ', yourPassport: 'HỘ CHIẾU VĂN HÓA', enterName: 'Nhập tên của bạn', revealName: 'Hiện tên của tôi',
    nameLabel: 'Tên', countryLabel: 'Quốc gia', scriptLabel: 'Chữ viết', beginGame: 'Bắt đầu trò chơi', howToPlay: 'CÁCH CHƠI', exitExhibit: '← Rời trưng bày', objectViewer: 'Xem hiện vật', dragRotate: 'Kéo để xoay', resetView: 'Đặt lại góc nhìn',
    material: 'Chất liệu', significance: 'Ý nghĩa', shagaiObject: 'Shagai · xương mắt cá cừu', shagaiMaterial: 'Xương, đôi khi được nhuộm hoặc làm nặng', shagaiSignificance: 'Dùng trong trò chơi, bói toán và học tập trên thảo nguyên Mông Cổ.',
    theThrow: 'Lượt ném', throwShagai: 'Ném Shagai', interpretation: 'Diễn giải', yourResult: 'Kết quả', fortune: 'Vận may', historicalNote: 'Ghi chú lịch sử', finishStamp: 'Hoàn thành & nhận dấu',
    archiveComplete: 'HOÀN THÀNH LƯU TRỮ', gameCompleted: 'Trò chơi đã hoàn thành', dateLabel: 'Ngày', exploreAnother: 'Khám phá quốc gia khác', returnWorldMap: 'Quay lại bản đồ thế giới',
    ideaKicker: 'Ý TƯỞNG', ideaTitle: 'Chúng tôi không chỉ lưu trữ trò chơi. Chúng tôi để mọi người gặp chúng.', ideaCopy: 'Games Across Time dùng bản đồ tương tác, video ngắn, luật chơi hoạt họa và hiện vật 3D để biến lịch sử văn hóa thành trải nghiệm khám phá.',
    culturalIntro: 'GIỚI THIỆU VĂN HÓA', welcomeTo: 'Chào mừng đến {country}', countryIntro: '{game} là trò chơi truyền thống từ {country}. Mục lưu trữ này giới thiệu cách chơi, đồ vật và ý nghĩa văn hóa của trò chơi.',
    countryPrompt: 'Trước khi bắt đầu, hãy thêm tên của bạn vào hộ chiếu lưu trữ {country}.', visitorPassport: 'Hộ chiếu tham quan cho {country}', visitorScript: 'Hiển thị tên người chơi (bản mẫu)', passportLede: 'Tên của bạn theo phong cách {country}:', beforePlay: '{country} · {game}',
    introSummaryGeneric: 'Tìm hiểu ý tưởng chính của {game} trước khi vào mục lưu trữ.', equipment: 'Dụng cụ', howToPlayCard: 'Cách chơi', culturalMeaning: 'Ý nghĩa văn hóa', culturalMeaningText: '{game} được giới thiệu như một phần truyền thống vui chơi sống động của {country}.', fullGame: 'Vào trưng bày', archiveEntryAction: 'Xem mục lưu trữ',
    awaitingThrow: 'Đang chờ bạn ném', throwHint: 'Bấm để ném bốn quân Shagai lên tấm nỉ.', tumbling: 'Các quân đang lăn…', loreDefault: 'Ném Shagai để xem diễn giải theo phong cách truyền thống. Nội dung này được đơn giản hóa cho bản mẫu.',
    completeTitle: 'Bạn đã trải nghiệm {game} — {country}.', takeaway: 'Bạn đã khám phá {game} từ {country}. Mục này có thể được mở rộng thành mini-game sau.', videoCaption: 'Xem {game} được chơi', videoPlaying: 'Video demo tạm thời · thay bằng MP4',
    stepCount: 'Bước {current} / {total}', previousStep: 'Bước trước', nextStep: 'Bước tiếp theo',
    certificateKicker: 'CHÚC MỪNG', certificateTitle: 'Chúc mừng, bạn đã hoàn thành tất cả trò chơi văn hóa trên thế giới.', continueExploring: 'Tiếp tục khám phá', closeCertificate: 'Đóng chứng nhận'
  }
};

sharedTranslations.zh = { ...sharedTranslations.vi,
  sideHome:'首页', sideMap:'地图', sideGames:'游戏', sideCultures:'文化', changeSettings:'更改玩家设置', sidebarQuote:'“游戏是连接我们的最古老语言。”', homeEyebrow:'传统游戏的活态档案', aboutProject:'关于项目', homeKicker:'一个世界 · 多种文化 · 无数游戏', homeTitle:'穿越时间的游戏',
  homeCopy:'追溯代代相传的游戏，探索至今仍连接人们的物件、故事与仪式。', interactiveAtlas:'互动地图', enterAtlas:'进入完整地图 ↗', featuredCollection:'精选收藏', fourGames:'四个游戏。四段历史。', prototypeCollection:'原型收藏',
  archiveEntry:'档案条目', selectedCountry:'已选国家', traditionalGame:'传统游戏', gamePreview:'游戏预览', howPlayed:'玩法', whyMatters:'意义', beginJourney:'开始旅程', cultureSnapshot:'文化快照', funFact:'趣味事实', gameDescription:'游戏介绍',
  connectionKicker:'连接', connectionTitle:'规则会改变，游戏的本能不会。', connectionCopy:'比较相隔千里的游戏中出现的策略、仪式与社群。', journeyTime:'穿越时间的旅程',
  past:'过去', origins:'起源', originsCopy:'游戏出现的地方以及使用的材料。', then:'后来', tradition:'传统', traditionCopy:'家庭和社区如何保存它。', now:'现在', connection:'连接', nowCopy:'通过视频、动画和3D文物观看游戏。',
  footerCopy:'为文化连接而建 · 黑客松原型', mapEyebrow:'互动地图', returnArchive:'← 返回档案', selectTerritory:'选择标记区域', mapInstruction:'悬停预览 · 点击进入文化',
  noStamps:'还没有护照印章。', passportStamped:'已盖章: {countries}', soloStatus:'单人模式: 按自己的节奏探索档案。', duelStatus:'对战模式: 选择一种文化开始挑战。', selectedStatus:'已选择 {country}: 阅读介绍后加入游戏。',
  object:'物件', type:'类型', joinGame:'加入游戏', continue:'继续', backAtlas:'← 返回地图', yourPassport:'文化护照', enterName:'输入你的名字', revealName:'显示我的名字',
  nameLabel:'姓名', countryLabel:'国家', scriptLabel:'文字', beginGame:'开始游戏', howToPlay:'玩法', exitExhibit:'← 退出展览', objectViewer:'物件查看器', dragRotate:'拖动旋转', resetView:'重置视图',
  material:'材料', significance:'意义', shagaiObject:'沙嘎 · 羊踝骨', shagaiMaterial:'骨头，有时染色或加重', shagaiSignificance:'在蒙古草原用于游戏、占卜和教学。',
  theThrow:'投掷', throwShagai:'投掷沙嘎', interpretation:'解读', yourResult:'你的结果', fortune:'运势', historicalNote:'历史说明', finishStamp:'完成并收集印章',
  archiveComplete:'档案完成', gameCompleted:'已完成游戏', dateLabel:'日期', exploreAnother:'探索另一个国家', returnWorldMap:'返回世界地图', ideaKicker:'理念', ideaTitle:'我们不只是保存游戏，而是让人们遇见它们。', ideaCopy:'Games Across Time 使用互动地图、短片、动画规则和3D文物，让文化史成为可探索的体验。',
  culturalIntro:'文化介绍', welcomeTo:'欢迎来到 {country}', countryIntro:'{game} 是来自 {country} 的传统游戏。本条目介绍它的玩法、相关物件和文化意义。', countryPrompt:'开始前，请把你的名字加入 {country} 档案护照。',
  visitorPassport:'{country} 访客护照', visitorScript:'访客姓名显示（原型）', passportLede:'你的名字以 {country} 风格显示:', beforePlay:'{country} · {game}', introSummaryGeneric:'进入档案前先了解 {game} 的主要玩法。',
  equipment:'道具', howToPlayCard:'玩法', culturalMeaning:'文化意义', culturalMeaningText:'这里将 {game} 作为 {country} 活态游戏传统的一部分展示。', fullGame:'进入展览', archiveEntryAction:'查看档案条目',
  awaitingThrow:'等待投掷', throwHint:'点击把四个沙嘎投到毡面上。', tumbling:'骨子正在翻滚…', loreDefault:'投掷沙嘎后会显示传统风格的解读。本内容为原型简化版。',
  completeTitle:'你已体验 {country} 的 {game}。', takeaway:'你探索了来自 {country} 的 {game}。之后可扩展为可玩的小游戏。', videoCaption:'观看 {game} 的玩法', videoPlaying:'演示视频占位 · 请替换为 MP4', stepCount:'步骤 {current} / {total}', previousStep:'上一步', nextStep:'下一步', certificateKicker:'恭喜', certificateTitle:'恭喜，你已完成世界上所有文化游戏。', continueExploring:'继续探索', closeCertificate:'关闭证书'
};

sharedTranslations.ko = { ...sharedTranslations.vi,
  sideHome:'홈', sideMap:'지도', sideGames:'게임', sideCultures:'문화', changeSettings:'플레이어 설정 변경', sidebarQuote:'“놀이는 우리 모두를 연결하는 가장 오래된 언어입니다.”', homeEyebrow:'전통 놀이의 살아 있는 아카이브', aboutProject:'프로젝트 소개', homeKicker:'하나의 세계 · 다양한 문화 · 수많은 게임', homeTitle:'시간을 건너는 게임',
  homeCopy:'세대를 지나 전해진 게임을 따라가고, 오늘도 사람들을 잇는 물건과 이야기, 의식을 탐험합니다.', interactiveAtlas:'인터랙티브 지도', enterAtlas:'전체 지도 열기 ↗', featuredCollection:'주요 컬렉션', fourGames:'네 가지 게임. 네 가지 역사.', prototypeCollection:'프로토타입 컬렉션',
  archiveEntry:'아카이브 항목', selectedCountry:'선택한 국가', traditionalGame:'전통 게임', gamePreview:'게임 미리보기', howPlayed:'플레이 방법', whyMatters:'중요한 이유', beginJourney:'여정 시작', cultureSnapshot:'문화 스냅샷', funFact:'재미있는 사실', gameDescription:'게임 설명',
  connectionKicker:'연결', connectionTitle:'규칙은 변해도, 놀이의 본능은 변하지 않습니다.', connectionCopy:'멀리 떨어진 게임 속 전략, 의식, 공동체를 비교합니다.', journeyTime:'시간을 지나는 여정',
  past:'과거', origins:'기원', originsCopy:'게임이 생겨난 곳과 사용된 재료.', then:'그때', tradition:'전통', traditionCopy:'가족과 공동체가 어떻게 이어 왔는지.', now:'현재', connection:'연결', nowCopy:'영상, 애니메이션, 3D 유물로 게임을 봅니다.',
  footerCopy:'문화적 연결을 위한 해커톤 프로토타입', mapEyebrow:'인터랙티브 지도', returnArchive:'← 아카이브로 돌아가기', selectTerritory:'표시된 지역 선택', mapInstruction:'마우스를 올려 미리보기 · 클릭해 문화로 이동',
  noStamps:'아직 여권 스탬프가 없습니다.', passportStamped:'스탬프 완료: {countries}', soloStatus:'솔로 모드: 자신의 속도로 탐험합니다.', duelStatus:'듀얼 모드: 문화를 선택해 도전을 시작합니다.', selectedStatus:'{country} 선택됨: 소개를 읽고 게임에 참여하세요.',
  object:'오브젝트', type:'유형', joinGame:'게임 참여', continue:'계속', backAtlas:'← 지도로 돌아가기', yourPassport:'문화 여권', enterName:'이름 입력', revealName:'내 이름 보기',
  nameLabel:'이름', countryLabel:'국가', scriptLabel:'문자', beginGame:'게임 시작', howToPlay:'플레이 방법', exitExhibit:'← 전시 나가기', objectViewer:'오브젝트 뷰어', dragRotate:'드래그하여 회전', resetView:'보기 재설정',
  material:'재료', significance:'의미', shagaiObject:'샤가이 · 양 발목뼈', shagaiMaterial:'뼈, 때로는 염색하거나 무게를 더함', shagaiSignificance:'몽골 초원에서 게임, 점, 교육에 사용되었습니다.',
  theThrow:'던지기', throwShagai:'샤가이 던지기', interpretation:'해석', yourResult:'결과', fortune:'운세', historicalNote:'역사 메모', finishStamp:'완료하고 스탬프 받기',
  archiveComplete:'아카이브 완료', gameCompleted:'완료한 게임', dateLabel:'날짜', exploreAnother:'다른 국가 탐험', returnWorldMap:'세계 지도로 돌아가기', ideaKicker:'아이디어', ideaTitle:'우리는 게임을 보관만 하지 않고, 사람들이 만나게 합니다.', ideaCopy:'Games Across Time은 인터랙티브 지도, 짧은 영상, 애니메이션 규칙, 3D 유물을 통해 문화사를 탐험 가능한 경험으로 만듭니다.',
  culturalIntro:'문화 소개', welcomeTo:'{country}에 오신 것을 환영합니다', countryIntro:'{game}은 {country}의 전통 게임입니다. 이 항목은 플레이 방법, 관련 물건, 문화적 의미를 소개합니다.', countryPrompt:'시작하기 전에 {country} 아카이브 여권에 이름을 추가하세요.',
  visitorPassport:'{country} 방문자 여권', visitorScript:'방문자 이름 표시(프로토타입)', passportLede:'{country} 스타일의 이름 표시:', beforePlay:'{country} · {game}', introSummaryGeneric:'아카이브에 들어가기 전에 {game}의 핵심을 배웁니다.',
  equipment:'도구', howToPlayCard:'플레이 방법', culturalMeaning:'문화적 의미', culturalMeaningText:'{game}은 {country}의 살아 있는 놀이 전통으로 소개됩니다.', fullGame:'전시 입장', archiveEntryAction:'아카이브 항목 보기',
  awaitingThrow:'던지기를 기다리는 중', throwHint:'클릭하여 네 개의 샤가이를 펠트 위에 던집니다.', tumbling:'뼈가 굴러가는 중…', loreDefault:'샤가이를 던지면 전통 스타일의 해석이 표시됩니다. 이 내용은 프로토타입용 간단한 표현입니다.',
  completeTitle:'{country}의 {game}을 체험했습니다.', takeaway:'{country}의 {game}을 탐험했습니다. 이 항목은 나중에 미니게임으로 확장할 수 있습니다.', videoCaption:'{game} 플레이 보기', videoPlaying:'데모 영상 자리표시자 · MP4로 교체', stepCount:'단계 {current} / {total}', previousStep:'이전 단계', nextStep:'다음 단계', certificateKicker:'축하합니다', certificateTitle:'축하합니다. 세계의 모든 문화 게임을 완료했습니다.', continueExploring:'계속 탐험하기', closeCertificate:'인증서 닫기'
};

Object.entries(sharedTranslations).forEach(([lang, values]) => {
  Object.assign(introTranslations[lang], values);
});

const gameStateTranslations = {
  en: {
    throwAgain: 'Click to throw again, or record this reading.',
    rareFortune: 'Bujiin Melkhii — a rare, fortunate throw',
    rareExplanation: 'All four positions landing differently is traditionally seen as a rare and auspicious combination. [Illustrative simplification — verify with cultural sources.]',
    uniformFortune: 'A uniform throw',
    uniformExplanation: 'All four bones landing as {position} is a striking, uncommon result. [Illustrative simplification — verify with cultural sources.]',
    mixedFortune: 'A mixed reading',
    mixedExplanation: 'A blend of positions is the most common outcome, read alongside the game or fortune being played. [Illustrative simplification — verify with cultural sources.]'
  },
  ja: {
    throwAgain: 'もう一度投げるか、この読みを記録します。',
    rareFortune: 'ブジーン・メルヒー — 珍しい幸運の投げ',
    rareExplanation: '4つすべてが異なる向きで出ることは、珍しく縁起のよい組み合わせとされます。[プロトタイプ用の簡略表現]',
    uniformFortune: '同じ向きの投げ',
    uniformExplanation: '4つすべてが {position} として出るのは印象的で珍しい結果です。[プロトタイプ用の簡略表現]',
    mixedFortune: '混合の読み',
    mixedExplanation: '複数の向きが混ざるのは最も一般的な結果で、遊びや占いの文脈で読みます。[プロトタイプ用の簡略表現]'
  },
  vi: {
    throwAgain: 'Bấm để ném lại hoặc ghi nhận lần đọc này.',
    rareFortune: 'Bujiin Melkhii — một lần ném hiếm và may mắn',
    rareExplanation: 'Bốn mặt rơi khác nhau thường được xem là tổ hợp hiếm và may mắn. [Diễn giải đơn giản cho bản mẫu]',
    uniformFortune: 'Một lần ném đồng nhất',
    uniformExplanation: 'Cả bốn quân cùng rơi ở vị trí {position} là một kết quả nổi bật và hiếm. [Diễn giải đơn giản cho bản mẫu]',
    mixedFortune: 'Một cách đọc pha trộn',
    mixedExplanation: 'Sự pha trộn nhiều vị trí là kết quả phổ biến nhất, được đọc theo ngữ cảnh trò chơi hoặc bói toán. [Diễn giải đơn giản cho bản mẫu]'
  },
  zh: {
    throwAgain: '点击再次投掷，或记录这次解读。',
    rareFortune: 'Bujiin Melkhii — 罕见而幸运的一投',
    rareExplanation: '四个位置各不相同通常被视为罕见且吉利的组合。[原型简化说明]',
    uniformFortune: '统一的一投',
    uniformExplanation: '四枚骨子都落为 {position} 是醒目而少见的结果。[原型简化说明]',
    mixedFortune: '混合解读',
    mixedExplanation: '多种位置混合是最常见的结果，会结合游戏或占卜情境来解读。[原型简化说明]'
  },
  ko: {
    throwAgain: '다시 던지거나 이 해석을 기록하세요.',
    rareFortune: 'Bujiin Melkhii — 드물고 행운의 던지기',
    rareExplanation: '네 가지 위치가 모두 다르게 나오는 것은 드물고 길한 조합으로 여겨집니다. [프로토타입용 간단 해석]',
    uniformFortune: '같은 위치의 던지기',
    uniformExplanation: '네 개가 모두 {position}으로 나오는 것은 인상적이고 드문 결과입니다. [프로토타입용 간단 해석]',
    mixedFortune: '혼합 해석',
    mixedExplanation: '여러 위치가 섞인 결과는 가장 흔하며, 게임이나 운세의 맥락에서 읽습니다. [프로토타입용 간단 해석]'
  }
};

Object.entries(gameStateTranslations).forEach(([lang, values]) => {
  Object.assign(introTranslations[lang], values);
});

let currentLang = 'en';

function t(key, vars = {}) {
  const value = (introTranslations[currentLang] && introTranslations[currentLang][key]) || introTranslations.en[key] || key;
  return Object.entries(vars).reduce((text, [name, replacement]) => text.split(`{${name}}`).join(replacement), value);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatDiscoveryCount() {
  return `${discoveredKeys().length} / ${visibleCountryKeys().length} ${t('culturesDiscovered')}`;
}

function updateJourneyCounter() {
  const counter = q('#journeyCounter');
  if (counter) counter.textContent = formatDiscoveryCount();
  const collectionCount = q('#collectionCount');
  if (collectionCount) collectionCount.textContent = formatDiscoveryCount();
}

function localizeCountryDescription(key) {
  const c = countries[key];
  if (!c) return '';
  return currentLang === 'en' ? c.description : t('countryIntro', { country: c.country, game: c.game });
}

function localizeCountryAlias(key) {
  const c = countries[key];
  if (!c) return '';
  return currentLang === 'en' ? c.alias : t('introSummaryGeneric', { country: c.country, game: c.game });
}

function localizeCountryPrompt(key) {
  const c = countries[key];
  if (!c) return '';
  return currentLang === 'en' && journey[key]?.prompt ? journey[key].prompt : t('countryPrompt', { country: c.country, game: c.game });
}

function localizeTakeaway(key) {
  const c = countries[key];
  const j = journey[key];
  if (!c) return '';
  return currentLang === 'en' && j?.takeaway ? j.takeaway : t('takeaway', { country: c.country, game: c.game });
}

function applyIntroLanguage(lang) {
  currentLang = lang;
  const dictionary = introTranslations[lang] || introTranslations.en;
  qa('[data-i18n]').forEach(el => {
    const value = dictionary[el.dataset.i18n];
    if (value) el.textContent = value;
  });
  q('#leaderboardCloseBtn')?.setAttribute('aria-label', dictionary.closeLeaderboard);
  q('#introLanguageSelect')?.setAttribute('aria-label', dictionary.chooseLanguage);
  q('.certificate-close')?.setAttribute('aria-label', dictionary.closeCertificate);
  q('#prevStep')?.setAttribute('aria-label', t('previousStep'));
  q('#nextStep')?.setAttribute('aria-label', t('nextStep'));
  document.documentElement.lang = lang;
  renderCurrentLanguageState();
}

function renderCurrentLanguageState() {
  if (!q('#screen-home')) return;
  if (countries[selectedCountry]) {
    selectHomeCountry(selectedCountry);
    if (previewCountry) fillAtlasPreview(previewCountry);
    if (activeScreen === 'welcome') renderWelcomeContent(selectedCountry);
    if (activeScreen === 'gameintro') showJourneyIntro(selectedCountry);
    if (activeScreen === 'game') setupGameScreen();
    if (activeScreen === 'complete') renderCompletionContent();
    if (activeScreen === 'question') renderQuestionScreen(selectedCountry);
    if (!q('#cardUnlock')?.hidden) renderUnlockCard(selectedCountry);
  }
  if (activeScreen === 'collection') renderCollection();
  if (activeScreen === 'summary') renderJourneySummary();
  updateCompletionMarkers();
}

function hasCompletedCertificateCountries() {
  return certificateCountries.every(key => completedCountries.has(key));
}

function maybeShowCertificate() {
  const certificate = q('#certificateCelebration');
  if (!certificate || !certificatePending || certificateShown || activeScreen !== 'worldmap') return;
  certificatePending = false;
  certificateShown = true;
  certificate.hidden = false;
  document.body.classList.add('certificate-open');
}

function closeCertificate() {
  const certificate = q('#certificateCelebration');
  if (certificate) certificate.hidden = true;
  document.body.classList.remove('certificate-open');
}

function cardArtwork(key) {
  return countries[key]?.cardImage || countries[key]?.preview || 'assets/vn-card.png';
}

function archiveCardMarkup(key, opts = {}) {
  const c = countries[key];
  const discovered = completedCountries.has(key);
  const record = discoveryRecords[key];
  const locked = opts.locked || !discovered;
  const dateText = record?.discoveredAt ? new Date(record.discoveredAt).toLocaleString() : '';
  return `
    <article class="archive-card collection-card ${locked ? 'locked' : 'unlocked'}" data-collection-card="${escapeHtml(key)}">
      <div class="archive-card-inner">
        <div class="archive-card-face archive-card-front">
          <div class="archive-card-art">
            ${locked ? '<span class="locked-mark">?</span>' : `<img src="${escapeHtml(cardArtwork(key))}" alt="${escapeHtml(c.game)} illustration" />`}
          </div>
          <div class="archive-card-body">
            <small>${escapeHtml(c.country.toUpperCase())}</small>
            <h2>${locked ? '?' : escapeHtml(c.game)}</h2>
            <em>${locked ? t('undiscovered') : `✓ ${t('discovered')}`}</em>
            ${locked ? `<button class="text-button collection-explore" data-explore-country="${escapeHtml(key)}">${t('exploreAction')}</button>` : ''}
          </div>
        </div>
        <div class="archive-card-face archive-card-back">
          <div class="archive-card-body">
            <small>${escapeHtml(c.country.toUpperCase())}</small>
            <h2>${escapeHtml(c.game)}</h2>
            <p>${escapeHtml(c.gameDescription || c.description)}</p>
            <p><b>${t('cultureSnapshot')}</b>${escapeHtml(c.cultureDescription || c.cultureSnapshot || '')}</p>
            <p><b>${t('didYouKnow')}</b>${escapeHtml(c.funFact || '')}</p>
            ${dateText ? `<time>${escapeHtml(dateText)}</time>` : ''}
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCollection() {
  const grid = q('#collectionGrid');
  if (!grid) return;
  updateJourneyCounter();
  grid.innerHTML = visibleCountryKeys().map(key => archiveCardMarkup(key)).join('');
  qa('[data-collection-card]').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('[data-explore-country]')) return;
      if (!completedCountries.has(card.dataset.collectionCard)) return;
      card.classList.toggle('flipped');
    });
  });
  qa('[data-explore-country]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openCountryFromCollection(btn.dataset.exploreCountry);
    });
  });
}

function openCountryFromCollection(key) {
  selectedCountry = key;
  previewCountry = null;
  showScreen('worldmap');
  requestAnimationFrame(() => {
    initLeafletMap();
    openAtlasPreview(key);
  });
}

function renderJourneySummary() {
  const keys = discoveredKeys();
  const continents = new Set(keys.map(key => countries[key].continent).filter(Boolean));
  q('#summaryCountries').textContent = keys.length;
  q('#summaryGames').textContent = keys.length;
  q('#summaryContinents').textContent = continents.size;

  const list = q('#summaryList');
  if (list) {
    list.innerHTML = keys.length
      ? keys.map(key => `<div><span>${escapeHtml(countries[key].stamp)}</span><b>${escapeHtml(countries[key].country)} — ${escapeHtml(countries[key].game)}</b></div>`).join('')
      : '<p>No discoveries yet. Return to the map to begin.</p>';
  }

  const cards = q('#summaryCards');
  if (cards) {
    cards.innerHTML = keys.map(key => archiveCardMarkup(key)).join('');
  }
}

function renderQuestionScreen(key = selectedCountry) {
  const c = countries[key];
  if (!c) return;
  pendingCardCountry = key;
  q('#questionCountry').textContent = `${c.country} · ${c.game}`;
  q('#questionText').textContent = c.question;
  const feedback = q('#answerFeedback');
  const collect = q('#collectCardBtn');
  feedback.hidden = true;
  feedback.textContent = '';
  collect.hidden = true;

  const grid = q('#answerGrid');
  grid.innerHTML = c.answers.map(answer => `<button type="button" data-answer="${escapeHtml(answer)}">${escapeHtml(answer)}</button>`).join('');
  qa('#answerGrid button').forEach(btn => {
    btn.addEventListener('click', () => {
      qa('#answerGrid button').forEach(option => option.disabled = true);
      const isCorrect = btn.dataset.answer === c.correctAnswer;
      btn.classList.add(isCorrect ? 'correct' : 'incorrect');
      if (!isCorrect) {
        const correct = qa('#answerGrid button').find(option => option.dataset.answer === c.correctAnswer);
        correct?.classList.add('correct');
      }
      feedback.hidden = false;
      feedback.className = `answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
      feedback.textContent = isCorrect
        ? `✓ ${t('correct')}: ${c.correctResponse}`
        : `${t('notQuite')} — ${c.correctResponse}`;
      collect.hidden = false;
    });
  });
  showScreen('question', { instant: true });
}

function unlockCulturalCard(key = pendingCardCountry || selectedCountry) {
  const c = countries[key];
  if (!c) return;
  selectedCountry = key;
  completedCountries.add(key);
  discoveryRecords[key] = discoveryRecords[key] || { discoveredAt: new Date().toISOString() };
  saveJourneyProgress();
  updateCompletionMarkers();
  renderUnlockCard(key);
  if (!certificateShown && hasCompletedCertificateCountries()) certificatePending = true;
}

function renderUnlockCard(key) {
  const c = countries[key];
  const overlay = q('#cardUnlock');
  if (!overlay || !c) return;
  clearTimeout(unlockTimer);
  q('#unlockCardImage').src = cardArtwork(key);
  q('#unlockCardImage').alt = `${c.game} illustration`;
  q('#unlockCountry').textContent = c.country.toUpperCase();
  q('#unlockTitle').textContent = c.game;
  q('#unlockCulture').textContent = c.cultureDescription || c.cultureSnapshot || '';
  q('#unlockFact').textContent = c.funFact || '';
  q('#unlockCard')?.classList.remove('travelling');
  overlay.hidden = false;
  unlockTimer = window.setTimeout(() => continueAfterUnlock(), 4800);
}

function closeCardUnlock() {
  clearTimeout(unlockTimer);
  const overlay = q('#cardUnlock');
  if (overlay) overlay.hidden = true;
  q('#unlockCard')?.classList.remove('travelling');
}

function continueAfterUnlock(destination = 'worldmap') {
  clearTimeout(unlockTimer);
  const card = q('#unlockCard');
  card?.classList.add('travelling');
  window.setTimeout(() => {
    closeCardUnlock();
    renderCollection();
    showScreen(destination);
  }, card ? 620 : 0);
}

function animateIntroCount(el, end, duration = 900) {
  if (!el) return;
  const start = Math.max(0, Math.floor(end * .86));
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.round(start + (end - start) * eased);
    el.textContent = value.toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function runIntroStats() {
  animateIntroCount(q('#introPlays'), 18290693, 1100);
  animateIntroCount(q('#introDuels'), 534844, 1000);
  animateIntroCount(q('#introRecord'), 899, 850);
}

function enterFromIntro(mode) {
  selectedMode = mode;
  const status = q('#atlasStatus');
  if (status && !completedCountries.size) {
    status.textContent = mode === 'duel'
      ? t('duelStatus')
      : t('soloStatus');
  }
  showScreen(mode === 'duel' ? 'worldmap' : 'home');
}

q('#soloStartBtn')?.addEventListener('click', () => enterFromIntro('solo'));
q('#introLanguageSelect')?.addEventListener('change', e => applyIntroLanguage(e.target.value));
q('#leaderboardBtn')?.addEventListener('click', () => {
  q('#leaderboardPanel').hidden = false;
});
q('#leaderboardCloseBtn')?.addEventListener('click', () => {
  q('#leaderboardPanel').hidden = true;
});
qa('[data-intro-jump]').forEach(btn => btn.addEventListener('click', () => {
  const target = q(`#${btn.dataset.introJump === 'leaderboard' ? 'leaderboardPanel' : btn.dataset.introJump}`);
  if (btn.dataset.introJump === 'leaderboard') {
    q('#leaderboardPanel').hidden = false;
    return;
  }
  target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}));

qa('[data-nav]').forEach(el => el.addEventListener('click', e => {
  e.preventDefault();
  showScreen(el.dataset.nav);
}));

q('#mapPreviewBtn').addEventListener('click', () => showScreen('worldmap'));

qa('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
  showScreen('home', { instant: true });
  requestAnimationFrame(() => {
    const target = document.getElementById(btn.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}));

/* =========================================================
   HOME — exhibit panel + about dialog
   ========================================================= */
function selectHomeCountry(key) {
  const c = countries[key];
  if (!c) return;
  selectedCountry = key;
  q('#entryNumber').textContent = c.number;
  q('#countryName').textContent = c.country;
  q('#flagSeal').textContent = c.seal;
  q('#catalogueStamp').textContent = c.stamp;
  q('#gameName').textContent = c.game;
  q('#gameAlias').textContent = localizeCountryAlias(key);
  q('#description').textContent = localizeCountryDescription(key);
  q('#previewImage').src = c.preview;
  q('#previewImage').alt = `Preview of ${c.game}`;
  q('#videoCaption').textContent = t('videoCaption', { game: c.game });
  qa('[data-country]').forEach(el => el.classList.toggle('active', el.dataset.country === key));
  refreshLeafletMarkers();
  updateCompletionMarkers();
  homeStep = 0;
  renderHomeStep();

  const exhibit = q('.exhibit');
  exhibit.animate([
    { opacity: .72, transform: 'translateY(6px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 260, easing: 'ease-out' });
}

let homeStep = 0;
function renderHomeStep() {
  const c = countries[selectedCountry];
  q('#stepCount').textContent = t('stepCount', { current: homeStep + 1, total: 3 });
  q('#stepText').textContent = c.steps[homeStep];
  q('#stepFocus').style.left = `${homeStep * 33.333}%`;
}

qa('.game-card[data-country]').forEach(el => el.addEventListener('click', () => selectHomeCountry(el.dataset.country)));
q('#nextStep').addEventListener('click', () => { homeStep = (homeStep + 1) % 3; renderHomeStep(); });
q('#prevStep').addEventListener('click', () => { homeStep = (homeStep + 2) % 3; renderHomeStep(); });

q('#videoPreview').addEventListener('click', () => {
  const cap = q('#videoCaption');
  const play = q('.play-button');
  const el = q('#videoPreview');
  if (!el.classList.contains('playing')) {
    el.classList.add('playing');
    play.textContent = 'Ⅱ';
    cap.textContent = t('videoPlaying');
  } else {
    el.classList.remove('playing');
    play.textContent = '▶';
    cap.textContent = t('videoCaption', { game: countries[selectedCountry].game });
  }
});

const aboutDialog = q('#aboutDialog');
q('#aboutBtn').addEventListener('click', () => aboutDialog.showModal());
qa('[data-close-dialog]').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog').close()));
qa('dialog').forEach(d => d.addEventListener('click', e => {
  const r = d.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
}));

q('#exploreBtn').addEventListener('click', () => beginJourney(selectedCountry));

/* =========================================================
   WORLD MAP — Leaflet atlas + cinematic travel
   ========================================================= */
const worldmapStage = q('#worldmapStage');
const leafletMapEl = q('#leafletMap');
const atlasPreviewPanel = q('#atlasPreviewPanel');
let previewCountry = null;
let leafletMap = null;
const leafletMarkers = new Map();
const mapCenter = [25, 48];
const mapLocations = {
  mongolia: [46.8625, 103.8467],
  japan: [36.2048, 138.2529],
  vietnam: [14.0583, 108.2772],
  ghana: [7.9465, -1.0232],
  southKorea: [35.9078, 127.7669],
  china: [35.8617, 104.1954],
  india: [20.5937, 78.9629],
  thailand: [15.8700, 100.9925],
  philippines: [12.8797, 121.7740],
  indonesia: [-0.7893, 113.9213],
  malaysia: [4.2105, 101.9758],
  kazakhstan: [48.0196, 66.9237],
  turkiye: [38.9637, 35.2433],
  greece: [39.0742, 21.8243],
  portugal: [39.3999, -8.2245],
  italy: [41.8719, 12.5674],
  spain: [40.4637, -3.7492],
  unitedKingdom: [52.3555, -1.1743],
  ireland: [53.1424, -7.6921],
  netherlands: [52.1326, 5.2913],
  finland: [61.9241, 25.7482],
  sweden: [60.1282, 18.6435],
  switzerland: [46.8182, 8.2275],
  mexico: [23.6345, -102.5528],
  unitedStates: [37.0902, -95.7129],
  canada: [56.1304, -106.3468],
  brazil: [-14.2350, -51.9253],
  argentina: [-38.4161, -63.6167],
  chile: [-35.6751, -71.5430],
  peru: [-9.1900, -75.0152],
  southAfrica: [-30.5595, 22.9375],
  kenya: [-0.0236, 37.9062],
  madagascar: [-18.7669, 46.8691],
  egypt: [26.8206, 30.8025],
  newZealand: [-40.9006, 174.8860]
};
const hiddenMapCountries = new Set([
  'thailand',
  'philippines',
  'indonesia',
  'malaysia',
  'kyrgyzstan',
  'greece',
  'spain',
  'ireland',
  'netherlands',
  'switzerland'
]);
const continentWashes = [
  { name: 'North America', color: '#557346', coords: [[72, -168], [70, -55], [46, -52], [18, -86], [12, -112], [33, -137], [55, -168]] },
  { name: 'South America', color: '#587f46', coords: [[13, -82], [9, -48], [-54, -57], [-55, -76], [-22, -82]] },
  { name: 'Europe', color: '#b87a38', coords: [[72, -12], [66, 42], [43, 46], [35, 20], [36, -10]] },
  { name: 'Africa', color: '#a0772f', coords: [[35, -18], [33, 52], [-35, 49], [-36, 16], [-20, -17]] },
  { name: 'Asia', color: '#9a5738', coords: [[75, 38], [68, 165], [7, 153], [-9, 100], [18, 58], [48, 44]] },
  { name: 'Oceania', color: '#5a6f9f', coords: [[-7, 111], [-8, 179], [-48, 178], [-47, 113]] }
];
const continentLabels = [
  { name: 'North America', coords: [47, -103] },
  { name: 'South America', coords: [-24, -61] },
  { name: 'Europe', coords: [55, 18] },
  { name: 'Africa', coords: [5, 21] },
  { name: 'Asia', coords: [48, 93] },
  { name: 'Oceania', coords: [-25, 139] }
];

function markerTooltip(key) {
  const c = countries[key];
  const isComplete = completedCountries.has(key);
  return `
    <span class="leaflet-tip-card">
      <b>${c.country}</b>
      <em>${isComplete ? `✓ ${t('discovered')}` : 'Traditional game waiting to be discovered'}</em>
      <small>${isComplete ? c.game : `[ ${t('exploreAction')} ]`}</small>
      <i class="pin-thumb">${c.seal}</i>
      <strong class="pin-action">${isComplete ? c.game : t('explore')}</strong>
    </span>
  `;
}

function createArchiveIcon(key) {
  const c = countries[key];
  const markerColor = c.markerColor || '#c59952';
  const labelX = c.labelX || '27px';
  const labelY = c.labelY || '-6px';
  return L.divIcon({
    className: 'map-pin leaflet-country-marker',
    html: `<span class="map-pin-content" style="--marker-color:${markerColor};--label-x:${labelX};--label-y:${labelY}"><span class="map-pin-dot"></span><span class="map-pin-label">${c.country}</span></span>`,
    iconSize: [18, 18],
    iconAnchor: [7, 14]
  });
}

function refreshLeafletMarkers() {
  leafletMarkers.forEach((marker, key) => {
    const el = marker.getElement();
    if (!el) return;
    const isComplete = completedCountries.has(key);
    const isActive = selectedCountry === key;
    const c = countries[key];
    el.dataset.country = key;
    el.classList.toggle('completed', isComplete);
    el.classList.toggle('active', isActive);
    el.classList.toggle('previewing', previewCountry === key);
    marker.setTooltipContent(markerTooltip(key));
    el.setAttribute('aria-label', `${c.country}, ${isComplete ? t('discovered') : t('notCompleted')}, ${c.game}. ${t('explore')}`);
  });
}

function closeAtlasPreview(resetMap = false) {
  if (atlasPreviewPanel) atlasPreviewPanel.hidden = true;
  previewCountry = null;
  if (worldmapStage) worldmapStage.classList.remove('preview-open');
  refreshLeafletMarkers();
  if (resetMap && leafletMap) leafletMap.flyTo(mapCenter, 2, { animate: true, duration: .45 });
}

function fillAtlasPreview(key) {
  const c = countries[key];
  if (!c) return;
  q('#atlasPreviewNumber').textContent = c.number;
  q('#atlasPreviewSeal').textContent = c.stamp;
  q('#atlasPreviewCountry').textContent = c.country;
  q('#atlasPreviewGame').textContent = c.game;
  q('#atlasPreviewCulture').textContent = c.cultureSnapshot || `${c.country} has a rich cultural tradition connected to community, memory and play.`;
  q('#atlasPreviewFunFact').textContent = c.funFact || `${c.game} shows how simple objects can become meaningful games across generations.`;
  q('#atlasPreviewDescription').textContent = localizeCountryDescription(key);
  q('#atlasPreviewObject').textContent = c.title;
  q('#atlasPreviewType').textContent = c.type;
}

function openAtlasPreview(key) {
  if (!journey[key]) return;
  initLeafletMap();
  previewCountry = key;
  selectedCountry = key;
  fillAtlasPreview(key);
  if (atlasPreviewPanel) atlasPreviewPanel.hidden = false;
  if (worldmapStage) worldmapStage.classList.add('preview-open');
  refreshLeafletMarkers();

  const status = q('#atlasStatus');
  if (status) status.textContent = t('selectedStatus', { country: countries[key].country, game: countries[key].game });
  if (leafletMap && mapLocations[key]) {
    leafletMap.flyTo(mapLocations[key], 5, { animate: true, duration: .75 });
  }
}

function initLeafletMap() {
  if (!leafletMapEl || leafletMap || !window.L) return;

  leafletMap = L.map(leafletMapEl, {
    attributionControl: true,
    maxBounds: [[-72, -190], [84, 190]],
    maxBoundsViscosity: .35,
    minZoom: 2,
    maxZoom: 6,
    scrollWheelZoom: false,
    worldCopyJump: true,
    zoomControl: true
  }).setView(mapCenter, 2);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 6,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(leafletMap);

  leafletMap.createPane('continentWashPane');
  leafletMap.getPane('continentWashPane').style.zIndex = 230;
  leafletMap.getPane('continentWashPane').style.pointerEvents = 'none';
  leafletMap.createPane('continentLabelPane');
  leafletMap.getPane('continentLabelPane').style.zIndex = 430;
  leafletMap.getPane('continentLabelPane').style.pointerEvents = 'none';

  continentWashes.forEach(({ color, coords }) => {
    L.polygon(coords, {
      pane: 'continentWashPane',
      interactive: false,
      stroke: false,
      fillColor: color,
      fillOpacity: .24,
      className: 'continent-wash'
    }).addTo(leafletMap);
  });

  continentLabels.forEach(({ name, coords }) => {
    L.marker(coords, {
      pane: 'continentLabelPane',
      interactive: false,
      icon: L.divIcon({
        className: 'continent-label-marker',
        html: `<span>${name}</span>`,
        iconSize: [190, 34],
        iconAnchor: [95, 17]
      })
    }).addTo(leafletMap);
  });

  Object.entries(mapLocations).filter(([key]) => !hiddenMapCountries.has(key)).forEach(([key, coords]) => {
    const marker = L.marker(coords, {
      icon: createArchiveIcon(key),
      keyboard: true,
      title: `${countries[key].country} · ${countries[key].game}`
    }).addTo(leafletMap);
    marker.bindTooltip(markerTooltip(key), {
      className: 'leaflet-archive-tip',
      direction: 'top',
      offset: [0, -18],
      opacity: 1
    });
    marker.on('mouseover', () => selectHomeCountry(key));
    marker.on('click', () => openAtlasPreview(key));
    leafletMarkers.set(key, marker);
  });

  refreshLeafletMarkers();
}

q('#atlasPreviewClose')?.addEventListener('click', () => closeAtlasPreview(true));
q('#atlasPreviewJoin')?.addEventListener('click', () => beginJourney(previewCountry || selectedCountry));

/* =========================================================
   JOURNEY — welcome, name, intro, game, completion
   ========================================================= */
function beginJourney(key) {
  if (!journey[key]) return;
  selectedCountry = key;
  renderWelcomeContent(key);
  showScreen('welcome', { instant: true });
}

function renderWelcomeContent(key) {
  const j = journey[key];
  if (!j) return;
  q('#welcomeEyebrow').textContent = t('culturalIntro');
  q('#welcomeTitle').textContent = t('welcomeTo', { country: j.country });
  q('#welcomeGame').textContent = j.game;
  q('#welcomeIntro').textContent = localizeCountryDescription(key);
  q('#welcomePrompt').textContent = localizeCountryPrompt(key);
  q('#welcomeIllustration').textContent = j.illustration;
}

q('#welcomeContinue').addEventListener('click', () => {
  const j = journey[selectedCountry];
  q('#nameHeading').textContent = currentLang === 'en' ? j.nameHeading : t('visitorPassport', { country: j.country });
  q('#nameInput').value = '';
  q('#passportCard').hidden = true;
  q('#nameForm').hidden = false;
  q('#passportCountryCode').textContent = j.code;
  q('#passportCountry').textContent = j.country;
  q('#passportScriptLabel').textContent = currentLang === 'en' ? j.scriptLabel : t('visitorScript');
  q('#passportSealCode').textContent = j.code;
  showScreen('name', { instant: true });
});

q('#nameForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = q('#nameInput').value.trim();
  if (!name) return;
  const j = journey[selectedCountry];
  const transformed = j.transliterate(name);

  q('#passportLede').textContent = t('passportLede', { country: j.country });
  q('#passportScript').textContent = transformed;
  q('#passportName').textContent = name;
  q('#passportCard').hidden = false;
  q('#nameForm').hidden = true;
});

function showJourneyIntro(key = selectedCountry) {
  if (!journey[key]) return;
  selectedCountry = key;
  closeAtlasPreview();
  const j = journey[key];
  q('#introEyebrow').textContent = t('beforePlay', { country: j.country, game: j.game });
  q('#introTitle').textContent = j.game;
  q('#introSummary').textContent = currentLang === 'en' ? j.introSummary : t('introSummaryGeneric', { country: j.country, game: j.game });

  const cardsEl = q('#introCards');
  cardsEl.innerHTML = '';
  if (j.positions.length) {
    j.positions.forEach(p => {
      cardsEl.insertAdjacentHTML('beforeend', `
        <div class="intro-card">
          <div class="intro-icon">${p.icon}</div>
          <b>${p.name}</b>
          <p>${p.meaning}</p>
        </div>`);
    });
  }

  const metaEl = q('#introMetaCards');
  metaEl.innerHTML = '';
  const c = countries[key];
  const metaCards = currentLang === 'en' ? j.metaCards : [
    { icon: '◈', title: t('equipment'), text: c.title },
    { icon: '◈', title: t('howToPlayCard'), text: c.steps.join(' ') },
    { icon: '◈', title: t('culturalMeaning'), text: t('culturalMeaningText', { country: c.country, game: c.game }) }
  ];
  metaCards.forEach(m => {
    metaEl.insertAdjacentHTML('beforeend', `
      <div class="intro-card">
        <div class="intro-icon">${m.icon}</div>
        <b>${m.title}</b>
        <p>${m.text}</p>
      </div>`);
  });

  q('#enterGameBtn').querySelector('span').textContent = j.hasFullGame ? t('fullGame') : t('archiveEntryAction');

  showScreen('gameintro', { instant: true });
}

q('#beginGameBtn').addEventListener('click', () => showJourneyIntro(selectedCountry));

q('#enterGameBtn').addEventListener('click', () => {
  const j = journey[selectedCountry];
  if (j.externalGame) {
    launchExternalGame(selectedCountry, j.externalGame);
  } else if (j.hasFullGame) {
    setupGameScreen();
    showScreen('game', { instant: true });
  } else {
    finishJourney();
  }
});

/* Games that live on their own page (game2.html, game3.html). The stamp is
   recorded before leaving so the atlas still shows it on the way back. */
function launchExternalGame(key, url) {
  completedCountries.add(key);
  persistProgress();
  window.location.href = `${url}?from=${encodeURIComponent(key)}`;
}

/* =========================================================
   MAIN GAME — Shagai (Mongolia)
   ========================================================= */
const positionNames = ['Horse', 'Camel', 'Sheep', 'Goat'];

function setupGameScreen() {
  q('#gameEyebrow').textContent = t('beforePlay', { country: journey[selectedCountry].country, game: journey[selectedCountry].game });
  resetTray();
  q('#loreResult').textContent = '— · — · — · —';
  q('#loreFortune').textContent = t('awaitingThrow');
  q('#loreExplanation').textContent = t('loreDefault');
  q('#throwBtn').disabled = false;
  q('#finishGameBtn').disabled = true;
  q('#arenaHint').textContent = t('throwHint');
}

function resetTray() {
  qa('.shagai-piece').forEach(p => {
    p.classList.remove('throwing', 'settled');
    p.style.animation = 'none';
    p.querySelectorAll('.piece-label').forEach(el => el.remove());
    void p.offsetWidth;
    p.style.animation = '';
  });
}

q('#throwBtn').addEventListener('click', () => {
  const btn = q('#throwBtn');
  btn.disabled = true;
  q('#arenaHint').textContent = t('tumbling');
  resetTray();

  const results = [];
  const pieces = qa('.shagai-piece');
  pieces.forEach((piece) => {
    const result = positionNames[Math.floor(Math.random() * 4)];
    results.push(result);

    const tx1 = (Math.random() * 160 - 80).toFixed(0) + 'px';
    const ty1 = (Math.random() * 120 - 60).toFixed(0) + 'px';
    const tr1 = (Math.random() * 480 - 240).toFixed(0) + 'deg';
    const tx2 = (Math.random() * 100 - 50).toFixed(0) + 'px';
    const ty2 = (Math.random() * 80 - 40).toFixed(0) + 'px';
    const tr2 = (Math.random() * 300 - 150).toFixed(0) + 'deg';
    const txf = (Math.random() * 80 - 40).toFixed(0) + 'px';
    const tyf = (Math.random() * 60 - 30).toFixed(0) + 'px';
    const trf = (Math.random() * 60 - 30).toFixed(0) + 'deg';

    piece.style.setProperty('--tx1', tx1);
    piece.style.setProperty('--ty1', ty1);
    piece.style.setProperty('--tr1', tr1);
    piece.style.setProperty('--tx2', tx2);
    piece.style.setProperty('--ty2', ty2);
    piece.style.setProperty('--tr2', tr2);
    piece.style.setProperty('--txf', txf);
    piece.style.setProperty('--tyf', tyf);
    piece.style.setProperty('--trf', trf);
    piece.classList.add('throwing');
  });

  setTimeout(() => {
    pieces.forEach((piece, i) => {
      piece.classList.remove('throwing');
      piece.classList.add('settled');
      const label = document.createElement('span');
      label.className = 'piece-label';
      label.textContent = results[i];
      piece.appendChild(label);
      requestAnimationFrame(() => label.style.opacity = '1');
    });
    renderResult(results);
    btn.disabled = false;
    q('#arenaHint').textContent = t('throwAgain');
  }, 950);
});

function renderResult(results) {
  q('#loreResult').textContent = results.join(' · ');
  const unique = new Set(results).size;
  let fortune, explanation;
  if (unique === 4) {
    fortune = t('rareFortune');
    explanation = t('rareExplanation');
  } else if (unique === 1) {
    fortune = t('uniformFortune');
    explanation = t('uniformExplanation', { position: results[0] });
  } else {
    fortune = t('mixedFortune');
    explanation = t('mixedExplanation');
  }
  q('#loreFortune').textContent = fortune;
  q('#loreExplanation').textContent = explanation;
  q('#finishGameBtn').disabled = false;
}

/* ---- museum-case 3D object viewer (drag / zoom / reset) ---- */
const bone3d = q('#bone3d');
let boneDragging = false, boneLastX = 0, boneLastY = 0, boneRX = -12, boneRY = 18, boneScale = 1;

function applyBoneTransform() {
  bone3d.style.transform = `scale(${boneScale}) perspective(700px) rotateX(${boneRX}deg) rotateY(${boneRY}deg)`;
}
applyBoneTransform();

bone3d.addEventListener('pointerdown', e => { boneDragging = true; boneLastX = e.clientX; boneLastY = e.clientY; bone3d.setPointerCapture(e.pointerId); bone3d.style.cursor = 'grabbing'; });
bone3d.addEventListener('pointermove', e => {
  if (!boneDragging) return;
  boneRY += (e.clientX - boneLastX) * .5;
  boneRX -= (e.clientY - boneLastY) * .4;
  boneLastX = e.clientX; boneLastY = e.clientY;
  applyBoneTransform();
});
bone3d.addEventListener('pointerup', () => { boneDragging = false; bone3d.style.cursor = 'grab'; });
bone3d.addEventListener('pointercancel', () => { boneDragging = false; bone3d.style.cursor = 'grab'; });

q('#caseZoomIn').addEventListener('click', () => { boneScale = Math.min(1.8, boneScale + .18); applyBoneTransform(); });
q('#caseZoomOut').addEventListener('click', () => { boneScale = Math.max(.5, boneScale - .18); applyBoneTransform(); });
q('#caseReset').addEventListener('click', () => { boneRX = -12; boneRY = 18; boneScale = 1; applyBoneTransform(); });

function idleBoneRotation() {
  if (!boneDragging && activeScreen === 'game') {
    boneRY += .12;
    applyBoneTransform();
  }
  requestAnimationFrame(idleBoneRotation);
}
requestAnimationFrame(idleBoneRotation);

/* =========================================================
   FINISH / COMPLETION
   ========================================================= */
q('#finishGameBtn').addEventListener('click', finishJourney);

function renderCompletionContent() {
  const j = journey[selectedCountry];
  if (!j) return;
  q('#completeTitle').textContent = t('completeTitle', { game: j.game, country: j.country });
  q('#stampCode').textContent = j.code;
  q('#stampGame').textContent = j.game;
  q('#stampCountry').textContent = j.country;
  q('#stampDate').textContent = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  q('#completionTakeaway').textContent = localizeTakeaway(selectedCountry);
}

const progressKey = 'gat:completed';

function persistProgress() {
  try {
    sessionStorage.setItem(progressKey, JSON.stringify([...completedCountries]));
  } catch (err) { /* storage blocked — progress just won't survive the page change */ }
}

function restoreProgress() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(progressKey) || '[]');
    if (Array.isArray(saved)) saved.forEach(key => { if (journey[key]) completedCountries.add(key); });
  } catch (err) { /* ignore blocked or malformed storage */ }
}

function finishJourney() {
  completedCountries.add(selectedCountry);
  if (!certificateShown && hasCompletedCertificateCountries()) {
    certificatePending = true;
  }
  persistProgress();
  pendingCardCountry = selectedCountry;
  renderCompletionContent();
  showScreen('complete', { instant: true });
}

qa('[data-certificate-close]').forEach(el => el.addEventListener('click', closeCertificate));

q('#exploreAnotherBtn').addEventListener('click', () => {
  renderQuestionScreen(pendingCardCountry || selectedCountry);
});

q('#collectCardBtn')?.addEventListener('click', () => unlockCulturalCard(pendingCardCountry || selectedCountry));
q('#unlockContinueBtn')?.addEventListener('click', () => continueAfterUnlock('worldmap'));
q('#unlockCollectionBtn')?.addEventListener('click', () => continueAfterUnlock('collection'));
q('#finishJourneyBtn')?.addEventListener('click', () => showScreen('summary'));
q('#summaryCollectionBtn')?.addEventListener('click', () => showScreen('collection'));
q('#newJourneyBtn')?.addEventListener('click', () => {
  if (window.confirm('Start a new journey? This will delete the current classroom progress on this device.')) {
    resetJourneyProgress();
  }
});

/* =========================================================
   INIT
   ========================================================= */
restoreProgress();
applyIntroLanguage(q('#introLanguageSelect')?.value || 'en');
selectHomeCountry('vietnam');
loadJourneyProgress();
updateCompletionMarkers();
// Coming back from game2.html / game3.html lands straight on the atlas.
showScreen(location.hash === '#worldmap' ? 'worldmap' : 'intro', { instant: true });
