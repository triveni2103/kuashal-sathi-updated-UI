/* ══════════════════════════════════════════════════════
   KAUSHAL SAATHI — FULL INTERACTIVE JS ENGINE v2.0
   NCERT Kaushal Bodh · NEP 2020 · AI + Voice + Gamified
   ══════════════════════════════════════════════════════ */

/* ── GLOBAL STATE ── */
var state = {
  topic: null,
  project: null,
  activity: null,
  currentTab: 'Sessions & Learning Plan',
  viewMode: 'teach',
  xp: 140,
  badges: [],
  completedSteps: {},
  voiceRecognition: null,
  voiceTarget: null,    /* 'chat' | 'step-N' | 'discuss-N' */
  timers: {},
  matchSelected: { left: null, right: null },
  matchPairs: {},
  dragSrc: null,
  assessmentScore: 0,
  advancedOptions: {
    periodDuration: 35,
    classSize: 'Medium (20–35)',
    state: '',
    city: '',
    resources: ['Chalk & Board'],
    tools: [],
    internet: false,
    subject: '',
    subjectIntegration: '',
    teachingChallenge: ''
  }
};

/* ── MATERIAL ICONS MAP ── */
var MAT_ICONS = {
  'Lemon': '🍋', 'Water': '💧', 'Salt': '🧂', 'Sugar': '🍬',
  'Lemons': '🍋', 'Jaggery': '🟫', 'Strainer': '🫙', 'Apron': '👗',
  'Measuring': '📏', 'Knife': '🔪', 'Board': '🪵', 'Bowl': '🥣',
  'Jar': '🫙', 'Bin': '🗑️', 'Poster': '📋', 'Pen': '✏️',
  'Worksheet': '📝', 'Recipe': '📖', 'Spoon': '🥄', 'Cup': '🥤',
  'default': '🧰'
};

function getMaterialIcon(name) {
  var keys = Object.keys(MAT_ICONS);
  for (var i = 0; i < keys.length; i++) {
    if (name.toLowerCase().includes(keys[i].toLowerCase())) return MAT_ICONS[keys[i]];
  }
  return MAT_ICONS.default;
}

/* ══════════════════════════════════
   DATA — FULL NCERT ACTIVITY OBJECTS
   ══════════════════════════════════ */
var DATA = {
  services: {
    label: 'Work in Human Services',
    icon: '🤝',
    color: 'lavender',
    headerBg: 'var(--lavender)',
    headerText: 'var(--lavender-dark)',
    projects: [
      {
        id: 'p-cooking-fireless',
        num: 'Project 6',
        name: 'Cooking without Fire',
        desc: 'Connection with curricular areas: Science & Math Application.',
        periods: 48,
        activities: [
          {
            id: 'a-1-able-to-do',
            name: 'What will I be able to do?',
            periods: 2,
            icon: '🎯',
            lo: ['LO 1', 'LO 7'],
            objectives: {
              text: 'Orientation of learning outcomes, toolkit discovery, and initial team role allocation.',
              chips: ['Goal Setting', 'Tool Blueprint', 'Team Building']
            },
            introVideo: { label: 'Project Orientation Video', duration: '3:20', youtube: '' },
            audioGuide: 'Welcome to the Cooking without Fire project! In this project, you will learn to prepare healthy meals safely.',
            materials: ['Measuring spoons', 'Standard Cups', 'Safe Aprons', 'Recipe Deck Templates', 'Notebook & Pen'],
            teacherScript: {
              say: '"Namaste students! Today we are entering the magical world of fireless culinary arts. Can anyone tell me who manages cooking at home? Today, you become the lead chefs!"',
              expect: 'Students will shout exciting names of dishes (Bhel, Salad, Juice).',
              redFlags: 'If students are shy, ask them to whisper to their partner first, then share.'
            },
            steps: [
              { title: 'Project Roadmap', desc: 'Display the full 48-period project execution roadmap on board. Let students identify which activities they are most excited about.', duration: '10 mins', hint: 'Map out student expectations. Use colorful markers.', image: '🗺️ Roadmap Display', reflection: 'Which activity are you most excited about and why?' },
              { title: 'Toolkit Discovery', desc: 'Hands-on discovery of standard volumetric cups vs household tablespoons. Let students hold, compare, and guess capacities.', duration: '15 mins', hint: 'Let them hold and guess capacities.', image: '⚖️ Measurement Tools', reflection: 'What surprised you about the difference between cups and spoons?' }
            ],
            groupWork: {
              title: 'Team Role Allocation',
              description: 'Assign roles for the project. Each group of 5 students gets one role set.',
              timer: 600,
              roles: [
                { icon: '👨‍🍳', title: 'Head Chef', task: 'Leads the cooking sequence and calls steps.' },
                { icon: '📏', title: 'Measurement Expert', task: 'Handles all measuring tools and quantities.' },
                { icon: '🧹', title: 'Cleanliness Monitor', task: 'Ensures workspace stays hygienic at all times.' },
                { icon: '📝', title: 'Recipe Reader', task: 'Reads aloud each step clearly to the group.' }
              ]
            },
            discussionQuestions: [
              'Why is it important to plan before cooking?',
              'What tools do professional chefs use that we don\'t have at school?',
              'How is cooking connected to science and mathematics?'
            ],
            conclusion: [
              'Every great meal starts with a plan — we now have ours.',
              'Measuring accurately is the first skill of a good cook.',
              'Teamwork and communication are as important as cooking technique.'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'Which measuring tool gives the most accurate quantity for liquids?',
                options: ['A tablespoon', 'A standard measuring cup', 'An empty bottle', 'A palm guess'],
                correct: 1
              },
              {
                type: 'drag',
                question: 'Arrange the planning steps in the correct order:',
                items: ['Assign team roles', 'Read the recipe', 'Gather materials', 'Start cooking', 'Clean workspace']
              },
              {
                type: 'voice',
                question: 'In your own words — what is the most important thing to do BEFORE starting to cook?'
              }
            ],
            classroomTips: {
              teacherNotes: ['Display the 48-period project map on a chart paper for the whole term.', 'Take photos of students with their tools — use for portfolio assessment later.'],
              commonMistakes: ['Students confuse tablespoons with teaspoons — demonstrate both physically.', 'Groups take too long choosing roles — use random role cards.'],
              safetyReminders: ['Ensure no sharp objects are distributed at this stage.', 'Teach proper apron-tying before any kitchen activity.'],
              timeManagement: ['Spend max 8 minutes on role allocation to leave time for tool exploration.', 'Use a visible class timer on the board.']
            },
            downloads: [
              { name: 'Culinary_Project_Map.pdf', size: '340 KB', type: 'pdf' },
              { name: 'Role_Cards.pptx', size: '220 KB', type: 'ppt' },
              { name: 'Student_Worksheet.docx', size: '115 KB', type: 'doc' }
            ]
          },
          {
            id: 'a-2-safety',
            name: 'How do I keep myself and others safe?',
            periods: 1,
            icon: '🛡️',
            lo: ['LO 6'],
            objectives: {
              text: 'Mastering personal hygiene norms, 7-step WHO handwashing, and non-sharp tool management.',
              chips: ['Hygiene', 'Cross-Contamination Prevention', 'WHO Protocol']
            },
            introVideo: { label: 'WHO 7-Step Handwashing Video', duration: '2:45', youtube: '' },
            audioGuide: 'Safety is the first rule of cooking. We will learn the 7-step handwashing technique today.',
            materials: ['Antiseptic handwash', 'Clean towels', 'Kitchen safety checklist charts', 'Plastic spreaders'],
            teacherScript: {
              say: '"Before we touch food, what is the invisible enemy we must destroy? Yes, Germs! Let us practice the scientific 7-step hand scrubbing routine together."',
              expect: 'Students follow the rubbing motions actively.',
              redFlags: 'Some students may rush — slow them down, count each step aloud.'
            },
            steps: [
              { title: 'WHO Handwashing Drill', desc: 'Demonstrate the complete WHO 7-step friction routine. Students mirror each step in pairs.', duration: '15 mins', hint: 'Check fingernails specifically. Count steps aloud together.', image: '🧼 Handwashing Steps', reflection: 'Which step do you usually skip at home? Why is it important?' },
              { title: 'Safe Tool Handling', desc: 'Simulate safe grip methods using non-sharp plastic or wooden spreaders. NO metal blades at this grade.', duration: '10 mins', hint: 'No metal blades at this grade boundary.', image: '🪵 Safe Spreader Grip', reflection: 'How would you explain safe cutting to a younger sibling?' }
            ],
            groupWork: {
              title: 'Safety Check Station',
              description: 'Groups rotate through 3 safety stations: hand-check, tool check, and workspace check.',
              timer: 480,
              roles: [
                { icon: '🔍', title: 'Safety Inspector', task: 'Checks that every member has washed hands correctly.' },
                { icon: '✅', title: 'Checklist Keeper', task: 'Marks off safety checklist items one by one.' },
                { icon: '📢', title: 'Safety Announcer', task: 'Reads each safety rule aloud to the group.' },
                { icon: '🧹', title: 'Cleanup Lead', task: 'Ensures station is clean after the group leaves.' }
              ]
            },
            discussionQuestions: [
              'Why do hospitals and kitchens have the same handwashing rules?',
              'What can happen if we skip washing hands before cooking?',
              'Name 3 things in your kitchen at home that could be a safety hazard.'
            ],
            conclusion: [
              'Germs are invisible — that\'s why hygiene routines must be automatic.',
              'Safe tools protect us. Never substitute with sharp alternatives.',
              'A safe kitchen is a happy kitchen!'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'How many steps are in the WHO handwashing protocol?',
                options: ['3 steps', '5 steps', '7 steps', '10 steps'],
                correct: 2
              },
              {
                type: 'match',
                question: 'Match each safety rule with its purpose:',
                left: ['Wash hands', 'Use spreaders', 'Wear apron', 'Tie hair back'],
                right: ['Prevent burns', 'Remove germs', 'Avoid hair in food', 'Prevent cuts']
              },
              {
                type: 'voice',
                question: 'Teach the 7 handwashing steps as if you are explaining to a Grade 3 student.'
              }
            ],
            classroomTips: {
              teacherNotes: ['Laminate the WHO handwashing poster and keep it near the activity station permanently.'],
              commonMistakes: ['Students skip Step 4 (thumb scrubbing) — watch for it specifically.', 'Students use dry towels to "wash" — ensure water access.'],
              safetyReminders: ['No metal knives or sharp tools in this session.', 'Check that spreaders have no rough or broken edges.'],
              timeManagement: ['Handwashing drill: 5 min instruction + 10 min practice in pairs.']
            },
            downloads: [
              { name: 'Safety_Protocol_Poster.pdf', size: '520 KB', type: 'pdf' },
              { name: 'Hygiene_Checklist.docx', size: '140 KB', type: 'doc' }
            ]
          },
          {
            id: 'a-3-reading-recipes',
            name: 'Reading Recipes (NCERT Core)',
            periods: 2,
            icon: '📖',
            lo: ['LO 1', 'LO 2', 'LO 3', 'LO 5', 'LO 6', 'LO 7', 'LO 8', 'LO 9', 'LO 16'],
            objectives: {
              text: 'Isolating ingredient parameters, reading sequencing hierarchies, and annotating step orders.',
              chips: ['Sequence Logic', 'Annotation Skills', 'Literacy Integration']
            },
            introVideo: { label: 'How to Read a Recipe — Demo', duration: '4:10', youtube: '' },
            audioGuide: 'A recipe is like a map. Follow it in order and you reach a delicious destination!',
            materials: ['Lemon Water Matrix Chart', 'Jumbled step strips', 'Color pens', 'Scissors', 'Glue sticks'],
            teacherScript: {
              say: '"Look at this chart. If I mix sugar after pouring ice-cold water, what happens to the solubility rate? Sequence matters!"',
              expect: 'Students respond that dissolving sugar takes much more time in cold liquid.',
              redFlags: 'If students don\'t understand "solubility", replace with: "Why does sugar take longer to dissolve in cold water?"'
            },
            steps: [
              { title: 'Jumbled Recipe Cards', desc: 'Distribute jumbled structural step cards of Lemon Water preparation. Groups reassemble them in the correct sequence on tables.', duration: '15 mins', hint: 'Let groups reassemble them on tables. Race format works well!', image: '📋 Recipe Step Cards', reflection: 'How did your group decide which step came first?' },
              { title: 'Choral Measurement Reading', desc: 'Run verbal choral reading sessions to clarify fractional measurements (1/2 tsp, 1 tbsp, 1/4 cup). Weave in math connections.', duration: '15 mins', hint: 'Connect directly with Math fractions class.', image: '📏 Fraction Measurement', reflection: 'What fraction of a cup is 2 tablespoons?' }
            ],
            groupWork: {
              title: 'Recipe Detective Challenge',
              description: 'Each group gets a different recipe with ONE missing ingredient or step. They must identify what\'s missing using logic.',
              timer: 720,
              roles: [
                { icon: '🕵️', title: 'Recipe Detective', task: 'Identifies the missing step or ingredient.' },
                { icon: '📖', title: 'Reader', task: 'Reads out the recipe clearly to the group.' },
                { icon: '🔢', title: 'Math Checker', task: 'Verifies all fractions and quantities are correct.' },
                { icon: '🎤', title: 'Presenter', task: 'Shares the group\'s findings with the class.' }
              ]
            },
            discussionQuestions: [
              'Why does the order of steps matter in a recipe?',
              'What would happen if we added salt instead of sugar to lemon water?',
              'How is reading a recipe similar to following math instructions?'
            ],
            conclusion: [
              'Recipes are precise documents — every word and fraction matters.',
              'Sequence is everything — wrong order = wrong result.',
              'Math fractions are hidden inside every recipe!'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'In a Lemon Water recipe, when should you add sugar for best results?',
                options: ['After adding ice', 'Into warm water first, then add ice', 'At the very end', 'It doesn\'t matter'],
                correct: 1
              },
              {
                type: 'drag',
                question: 'Arrange the Lemon Water steps in correct order:',
                items: ['Squeeze lemon juice', 'Add sugar to warm water', 'Stir until dissolved', 'Add cold water and ice', 'Taste and adjust salt']
              },
              {
                type: 'match',
                question: 'Match the measurement with its value:',
                left: ['1 tbsp', '1/2 cup', '1 tsp', '1/4 tsp'],
                right: ['125 ml', '5 ml', '15 ml', '1.25 ml']
              },
              {
                type: 'voice',
                question: 'Read out the Lemon Water recipe steps as if you are teaching a new student.'
              },
              {
                type: 'upload',
                question: 'Take a photo of your group\'s reassembled recipe card strip and upload it here.'
              }
            ],
            classroomTips: {
              teacherNotes: ['Pre-cut the recipe step strips before class to save time.', 'Use different colors for ingredients vs method steps.'],
              commonMistakes: ['Students confuse tsp (teaspoon) with tbsp (tablespoon) — create a hand gesture for each.', 'Groups may not read carefully — enforce "one person reads, others listen" rule.'],
              safetyReminders: ['Scissors used for cutting strips — use blunt-tip scissors only.'],
              timeManagement: ['15 min per activity block. Ring a bell at the halfway mark.', 'Keep 5 min at end for cross-group sharing.']
            },
            downloads: [
              { name: 'Lemon_Water_Blueprint.pdf', size: '210 KB', type: 'pdf' },
              { name: 'Recipe_Step_Strips.pdf', size: '180 KB', type: 'pdf' },
              { name: 'Measurement_Worksheet.docx', size: '130 KB', type: 'doc' },
              { name: 'Fraction_Recipe_PPT.pptx', size: '890 KB', type: 'ppt' }
            ]
          },
          {
            id: 'a-4-deciding-items',
            name: 'Deciding which items to make',
            periods: 5,
            icon: '🤔',
            lo: ['LO 1', 'LO 2', 'LO 3', 'LO 5', 'LO 6', 'LO 7', 'LO 8', 'LO 9', 'LO 16'],
            objectives: {
              text: 'Classroom democratic selection of regional traditional snacks using season-based constraints.',
              chips: ['Menu Planning', 'Nutritional Balance', 'Democratic Process']
            },
            introVideo: { label: 'Seasonal Food & Nutrition', duration: '5:00', youtube: '' },
            audioGuide: 'Good food choices depend on what is available, what is healthy, and what we can make safely.',
            materials: ['Regional agro-crop calendars', 'Nutrient grid cards', 'Voting slips', 'Whiteboard'],
            teacherScript: {
              say: '"We have a 5-period window to freeze our menu. Let us vote on choices that do not require fire, are locally sourced, and healthy."',
              expect: 'Groups argue between Sprout Chaat vs Fruit Salads.',
              redFlags: 'If voting gets chaotic, use a structured 2-option elimination bracket.'
            },
            steps: [
              { title: 'Seasonal Mapping', desc: 'Map available raw items against seasonal availability. Discuss which items are in season and affordable right now.', duration: '20 mins', hint: 'Avoid out-of-season expensive elements.', image: '📅 Seasonal Calendar', reflection: 'Which seasonal fruit or vegetable is most available in your area right now?' }
            ],
            groupWork: {
              title: 'Menu Committee',
              description: 'Each group proposes one menu item with cost, nutrition, and preparation difficulty rated.',
              timer: 900,
              roles: [
                { icon: '🍽️', title: 'Menu Designer', task: 'Creates the dish proposal with description.' },
                { icon: '💰', title: 'Cost Calculator', task: 'Estimates approximate ingredient cost.' },
                { icon: '🥦', title: 'Nutrition Expert', task: 'Lists 3 health benefits of the dish.' },
                { icon: '📊', title: 'Presenter', task: 'Pitches the dish to the class for votes.' }
              ]
            },
            discussionQuestions: [
              'Why should we choose locally available ingredients?',
              'What makes a dish "healthy" — taste or nutrition?',
              'How would you plan a menu for 30 students with ₹200 budget?'
            ],
            conclusion: [
              'Good menu planning balances taste, nutrition, cost, and availability.',
              'Voting and democratic decision-making are life skills too.',
              'Local, seasonal food is better for health and the environment.'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'Which is the BEST reason to choose seasonal ingredients?',
                options: ['They look more colorful', 'They are cheaper and more nutritious', 'They take less time to cook', 'They taste more salty'],
                correct: 1
              },
              {
                type: 'voice',
                question: 'Pitch your favorite fireless dish in 30 seconds — include ingredients, nutrition, and cost.'
              }
            ],
            classroomTips: {
              teacherNotes: ['Bring a real seasonal vegetable or fruit to class for show-and-tell.', 'Connect to science: photosynthesis, nutrition, soil quality.'],
              commonMistakes: ['Students pick dishes that require cooking/fire — keep reminding the "fireless" constraint.'],
              safetyReminders: ['If handling fresh produce for demonstration, ensure hygiene protocols are followed.'],
              timeManagement: ['Spread across 5 periods: 2 for research, 1 for pitching, 1 for voting, 1 for finalizing.']
            },
            downloads: [
              { name: 'Menu_Selection_Matrix.xlsx', size: '1.1 MB', type: 'xlsx' },
              { name: 'Nutrition_Grid_Cards.pdf', size: '340 KB', type: 'pdf' }
            ]
          },
          {
            id: 'a-5-measuring',
            name: 'How to measure, use tools and store food',
            periods: 6,
            icon: '⚖️',
            lo: ['LO 1', 'LO 2', 'LO 3', 'LO 5', 'LO 6', 'LO 7', 'LO 8', 'LO 9', 'LO 16'],
            objectives: {
              text: 'Evaluating precise shelf-life parameters, label notation, and level spoon techniques.',
              chips: ['Math Fractions', 'Storage Technology', 'Precision Skills']
            },
            introVideo: { label: 'Measurement Masterclass', duration: '6:00', youtube: '' },
            audioGuide: 'A level teaspoon and a heaped teaspoon are completely different — this lesson will show you why precision matters!',
            materials: ['Air-tight clear jars', 'Sticky labels', 'Granulated Sugar containers', 'Salt containers', 'Flat ruler for leveling'],
            teacherScript: {
              say: '"A heaped teaspoon holds double the amount of a level teaspoon! For uniform taste balance, sweep off the excess pile cleanly using a flat ruler."',
              expect: 'Students practice leveling motions.',
              redFlags: 'If students are sloppy with leveling, pair a careful student with each careless one.'
            },
            steps: [
              { title: 'Fraction Measurement Lab', desc: 'Group exercises measuring exactly 1/4th, 1/2, and 3/4th volumetric dry indices using sugar and salt.', duration: '20 mins', hint: 'Synchronize directly with fractions class syllabus.', image: '📐 Measurement Lab', reflection: 'What is the difference between a level teaspoon and a heaped teaspoon?' }
            ],
            groupWork: {
              title: 'Measurement Olympics',
              description: 'Groups race to measure exact quantities accurately. The group with least error wins!',
              timer: 720,
              roles: [
                { icon: '🏋️', title: 'Measurer', task: 'Handles all scooping and leveling.' },
                { icon: '📏', title: 'Checker', task: 'Verifies accuracy of each measurement.' },
                { icon: '⏱️', title: 'Timer', task: 'Records how long each measurement takes.' },
                { icon: '📝', title: 'Recorder', task: 'Writes down all measurements in the logbook.' }
              ]
            },
            discussionQuestions: [
              'Why do recipes use standard measurements instead of "a pinch" or "a handful"?',
              'How would a recipe change if you doubled every ingredient?',
              'What fraction of a cup is 4 tablespoons?'
            ],
            conclusion: [
              'Precision in measurement = consistent taste every time.',
              'Math fractions are used every single time we cook.',
              'Proper storage extends the life of food and prevents waste.'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'How many teaspoons make 1 tablespoon?',
                options: ['2 teaspoons', '3 teaspoons', '4 teaspoons', '5 teaspoons'],
                correct: 1
              },
              {
                type: 'drag',
                question: 'Arrange from smallest to largest measurement:',
                items: ['1 pinch', '1 teaspoon', '1 tablespoon', '1/4 cup', '1/2 cup', '1 cup']
              }
            ],
            classroomTips: {
              teacherNotes: ['Bring all tools physically — visual + tactile is essential for this lesson.', 'Create a laminated "Measurement Conversion Chart" for each group.'],
              commonMistakes: ['Heaped vs level is the #1 confusion — drill it multiple times.', 'Students eyeball instead of measuring — enforce proper technique.'],
              safetyReminders: ['Spillage of sugar/salt — keep floor dry to prevent slipping.', 'No glass jars at this level — use plastic.'],
              timeManagement: ['2 periods for measuring drills, 2 for storage labeling, 2 for consolidation.']
            },
            downloads: [
              { name: 'Volumetric_Fraction_Guide.pptx', size: '1.8 MB', type: 'ppt' },
              { name: 'Measurement_Conversion_Chart.pdf', size: '190 KB', type: 'pdf' }
            ]
          },
          {
            id: 'a-7-beverages',
            name: 'Making beverages',
            periods: 3,
            icon: '🥤',
            lo: ['LO 1', 'LO 2', 'LO 3', 'LO 5', 'LO 6', 'LO 8', 'LO 9'],
            objectives: {
              text: 'Realtime synthesis of Lemonade/Aam Panna configurations; testing solubility rates.',
              chips: ['Practical Squeezing', 'Taste Optimization', 'Science Integration']
            },
            introVideo: { label: 'Lemonade Science — Solubility Demo', duration: '3:50', youtube: '' },
            audioGuide: 'Roll the lemon before you squeeze it. This breaks the juice cells inside and you get more juice with less effort!',
            materials: ['Fresh lemons', 'Water jugs', 'Strainer systems', 'Jaggery alternatives', 'Salt', 'Black pepper', 'Measuring cups'],
            teacherScript: {
              say: '"Gently roll the lemon on the table under your palm before slicing. This breaks inside cells and releases double the liquid volume safely!"',
              expect: 'Students perform the rolling physical compression.',
              redFlags: 'Some students may press too hard and burst the lemon — demonstrate moderate pressure.'
            },
            steps: [
              { title: 'Lemon Technique', desc: 'Teach the lemon-rolling technique. Students practice on their lemons before squeezing. Compare juice yield with and without rolling.', duration: '10 mins', hint: 'Enforce constant dry cleanup wrappers. Have towels ready.', image: '🍋 Lemon Rolling Technique', reflection: 'How much more juice did you get by rolling vs not rolling?' },
              { title: 'Beverage Synthesis', desc: 'Groups deploy calculated mixture ratios, filter through strainers, and optimize taste profiles with salt, sugar, and black pepper.', duration: '25 mins', hint: 'Encourage experimentation within safe taste boundaries.', image: '🥤 Beverage Making', reflection: 'What would you change in your recipe to make it better next time?' }
            ],
            groupWork: {
              title: 'Taste Testing Panel',
              description: 'Each group makes their beverage and a panel of 3 students from OTHER groups judges it on taste, balance, and presentation.',
              timer: 900,
              roles: [
                { icon: '👨‍🍳', title: 'Beverage Maker', task: 'Prepares the drink following the recipe precisely.' },
                { icon: '📏', title: 'Measurement Expert', task: 'Ensures all quantities are exactly right.' },
                { icon: '🎨', title: 'Presentation Lead', task: 'Decides how to serve and present the drink.' },
                { icon: '⭐', title: 'Quality Taster', task: 'Tastes and gives final OK before serving.' }
              ]
            },
            discussionQuestions: [
              'What is "solubility" and how did you observe it while making the drink?',
              'Why does salt make a sweet drink taste better?',
              'How would Aam Panna differ from Lemonade in preparation?'
            ],
            conclusion: [
              'Cooking involves chemistry — mixing, dissolving, and balancing.',
              'Taste is subjective but proportions are scientific.',
              'Presentation matters as much as preparation!'
            ],
            assessments: [
              {
                type: 'mcq',
                question: 'Why do we roll the lemon before squeezing?',
                options: ['To make it warm', 'To break juice cells for more yield', 'To clean the skin', 'To make it round'],
                correct: 1
              },
              {
                type: 'drag',
                question: 'Arrange Lemon Water steps in order:',
                items: ['Roll the lemon', 'Squeeze juice', 'Mix sugar in warm water', 'Add juice', 'Add ice and taste']
              },
              {
                type: 'voice',
                question: 'Describe the taste of your group\'s beverage. What would you improve?'
              },
              {
                type: 'upload',
                question: 'Upload a photo of your group\'s finished beverage!'
              }
            ],
            classroomTips: {
              teacherNotes: ['Pre-arrange cleanup station with towels and waste bins before class.', 'Have plain water available for students who don\'t like citrus.'],
              commonMistakes: ['Not straining properly — seeds in drink is a common issue.', 'Adding too much salt — start with just a pinch and adjust.'],
              safetyReminders: ['No sharp knives — use safe plastic citrus squeezers.', 'Wipe up any spills immediately to prevent slipping.'],
              timeManagement: ['10 min technique, 25 min making, 10 min tasting and discussion.']
            },
            downloads: [
              { name: 'Beverage_Standard_Recipe.pdf', size: '310 KB', type: 'pdf' },
              { name: 'Taste_Testing_Rubric.docx', size: '95 KB', type: 'doc' },
              { name: 'Beverage_PPT.pptx', size: '1.4 MB', type: 'ppt' }
            ]
          }
        ]
      }
    ]
  },
  life: {
    label: 'Work with Life Forms',
    icon: '🌱',
    color: 'mint',
    headerBg: 'var(--mint)',
    headerText: 'var(--mint-dark)',
    projects: []
  },
  machines: {
    label: 'Work with Machines & Materials',
    icon: '⚙️',
    color: 'peach',
    headerBg: 'var(--peach)',
    headerText: 'var(--peach-dark)',
    projects: []
  }
};

/* ══════════════════════
   NAVIGATION ENGINE
   ══════════════════════ */
function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  var target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    var container = target.querySelector('.scrollable');
    if (container) container.scrollTop = 0;
  }
}

function selectTopic(topicKey) {
  state.topic = topicKey;
  var d = DATA[topicKey];
  document.getElementById('topic-status-tag').textContent = d.icon + ' ' + d.label;

  var hdr = document.getElementById('topic-header');
  hdr.innerHTML = `<div style="font-size:13px;font-weight:800;color:${d.headerText};text-transform:uppercase;letter-spacing:0.04em;">${d.icon} ${d.label}</div><div style="font-size:12px;color:${d.headerText};opacity:0.7;margin-top:2px;">${d.projects.length} Projects Available</div>`;
  hdr.style.background = d.headerBg;

  var list = document.getElementById('topic-projects-list');
  list.innerHTML = '';

  if (d.projects.length === 0) {
    list.innerHTML = `<div style="margin:40px 20px;text-align:center;color:var(--text-muted);"><div style="font-size:48px;margin-bottom:12px;">🚧</div><div style="font-weight:800;font-size:14px;margin-bottom:4px;">Coming Soon</div><div style="font-size:12px;">This topic's projects are under development.</div></div>`;
  } else {
    d.projects.forEach(p => {
      list.innerHTML += `
        <div class="proj-card" onclick="selectProject('${topicKey}', '${p.id}')">
          <div class="proj-row">
            <div class="proj-num" style="background:${d.headerBg};color:${d.headerText};">${p.num}</div>
            <div class="proj-info">
              <div class="proj-name">${p.name}</div>
              <div class="proj-desc">${p.desc}</div>
              <div style="display:flex;gap:5px;margin-top:6px;flex-wrap:wrap;">
                <span class="chip chip-${d.color}">${p.activities.length} Activities</span>
                <span class="chip chip-${d.color}">${p.periods} Periods</span>
              </div>
            </div>
            <i class="ti ti-chevron-right" style="color:var(--text-muted);font-size:18px;flex-shrink:0;"></i>
          </div>
        </div>`;
    });
  }
  go('s-topic');
}

function selectProject(topicKey, projId) {
  var d = DATA[topicKey];
  var proj = d.projects.find(p => p.id === projId);
  state.project = proj;
  state.topic = topicKey;

  document.getElementById('act-status-tag').textContent = d.icon + ' ' + proj.name;
  document.getElementById('acts-back-label').textContent = d.label;

  var hdr = document.getElementById('act-header');
  hdr.innerHTML = `
    <div style="font-size:17px;font-weight:800;color:${d.headerText};">${proj.name}</div>
    <div style="font-size:12px;color:${d.headerText};opacity:0.7;margin-top:2px;">📅 ${proj.periods} total periods · ${proj.activities.length} activities</div>`;
  hdr.style.background = d.headerBg;

  var list = document.getElementById('activities-list');
  list.innerHTML = `<div style="margin:8px 16px;padding:10px 14px;background:var(--yellow);border-radius:10px;font-size:11px;font-weight:700;border:1px solid var(--yellow-mid);display:flex;align-items:center;gap:6px;">⚡ Tap any activity to open the full interactive lesson plan</div>`;

  proj.activities.forEach((act, idx) => {
    var completed = state.completedSteps[act.id] ? '✅' : '';
    list.innerHTML += `
      <div class="act-row" onclick="igniteInteractiveLesson('${topicKey}', '${projId}', '${act.id}')">
        <div class="act-num" style="background:${d.headerBg};color:${d.headerText};">${act.icon}</div>
        <div class="act-info">
          <div class="act-name">${act.name} ${completed}</div>
          <div class="act-meta">${act.periods} Period${act.periods > 1 ? 's' : ''} · ${act.lo.slice(0, 3).join(', ')}${act.lo.length > 3 ? '…' : ''}</div>
        </div>
        <span class="act-periods" style="background:${d.headerBg};color:${d.headerText};">${act.periods}P</span>
      </div>`;
  });
  go('s-activities');
}

/* ══════════════════════════════════
   INTERACTIVE LESSON ENGINE
   ══════════════════════════════════ */
function igniteInteractiveLesson(topicKey, projId, actId) {
  var act = state.project.activities.find(a => a.id === actId);
  state.activity = act;
  state.currentTab = 'Sessions & Learning Plan';
  state.viewMode = 'teach';
  state.completedSteps[act.id] = state.completedSteps[act.id] || {};
  state.matchPairs = {};
  state.matchSelected = { left: null, right: null };
  state.assessmentScore = 0;
  lessonPeriodRoutingState = 0;

  document.getElementById('lesson-title').textContent = act.icon + ' ' + act.name;
  document.getElementById('lesson-xp').textContent = state.xp;
  document.getElementById('xp-count').textContent = state.xp;

  var chips = document.getElementById('lesson-chips');
  chips.innerHTML = `<span class="chip chip-lavender">${act.periods} Period${act.periods > 1 ? 's' : ''}</span>`;
  act.lo.forEach(l => chips.innerHTML += `<span class="chip chip-mint">${l}</span>`);
  if (act.objectives && act.objectives.chips) {
    act.objectives.chips.forEach(c => chips.innerHTML += `<span class="chip chip-sky">${c}</span>`);
  }

  /* Build tabs — Sessions & Learning Plan is default/first, Demonstration merged into flow */
  var TAB_NAMES = ['Sessions & Learning Plan', 'Overview', 'Activity Steps', 'Group Work', 'Discussion', 'Conclusion', 'Assessment', 'Classroom Tips', 'Downloads'];
  var tabs = document.getElementById('lesson-tabs');
  tabs.innerHTML = '';
  TAB_NAMES.forEach(function(t) {
    var active = (t === 'Sessions & Learning Plan') ? 'active' : '';
    tabs.innerHTML += `<button class="tab-btn ${active}" onclick="switchLessonView('${t}', this)">${t}</button>`;
  });

  /* Reset footer period buttons */
  document.querySelectorAll('.period-toggle-btn').forEach(function(b) { b.classList.remove('active'); });

  /* Reset mode buttons */
  document.getElementById('btn-teach-mode').classList.add('active');
  document.getElementById('btn-student-mode').classList.remove('active');

  renderLessonContent();
  go('s-lesson');
}

function switchLessonView(name, btn) {
  state.currentTab = name;
  document.querySelectorAll('#lesson-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLessonContent();
}

function toggleViewMode(mode) {
  state.viewMode = mode;
  document.getElementById('btn-teach-mode').classList.toggle('active', mode === 'teach');
  document.getElementById('btn-student-mode').classList.toggle('active', mode === 'student');
  renderLessonContent();
}

/* ══════════════════════════════════
   MASTER LESSON RENDERER
   ══════════════════════════════════ */
function renderLessonContent() {
  var area = document.getElementById('lesson-content');
  var act = state.activity;
  area.innerHTML = '';

  /* Progress bar mapping */
  var TAB_PROGRESS = { 'Sessions & Learning Plan': 10, 'Overview': 22, 'Activity Steps': 38, 'Group Work': 52, 'Discussion': 64, 'Conclusion': 76, 'Assessment': 88, 'Classroom Tips': 94, 'Downloads': 100 };
  var pct, labelText;
  if (lessonPeriodRoutingState === 1) {
    pct = 45;
    labelText = 'PERIOD 1';
  } else if (lessonPeriodRoutingState === 2) {
    pct = 75;
    labelText = 'PERIOD 2';
  } else {
    pct = TAB_PROGRESS[state.currentTab] || 10;
    labelText = state.currentTab.toUpperCase();
  }
  document.getElementById('lesson-progress').style.width = pct + '%';
  document.getElementById('progress-label').textContent = labelText;

  var box = document.createElement('div');
  box.className = 'workspace-block';
  box.innerHTML = renderTab(act, state.currentTab);
  area.appendChild(box);

  /* Wire up interactive elements */
  wireInteractivity();
}

function renderTab(act, tab) {
  switch (tab) {
    case 'Sessions & Learning Plan': return renderSessionsLearningPlan(act);
    case 'Overview':        return renderOverview(act) + renderDemonstration(act);
    case 'Activity Steps':  return renderActivitySteps(act);
    case 'Group Work':      return renderGroupWork(act);
    case 'Discussion':      return renderDiscussion(act);
    case 'Conclusion':      return renderConclusion(act);
    case 'Assessment':      return renderAssessment(act);
    case 'Classroom Tips':  return renderClassroomTips(act);
    case 'Downloads':       return renderDownloads(act);
    default: return '<p>Loading...</p>';
  }
}

/* ── TAB: OVERVIEW ── */
function renderOverview(act) {
  return `
    <!-- Objective -->
    <div class="interactive-node-card">
      <div class="node-title-area">🎯 Learning Objective</div>
      <p class="node-body-text">${act.objectives.text}</p>
      <div class="skills-row">
        ${act.objectives.chips.map(c => `<span class="skill-tag">${c}</span>`).join('')}
        ${act.lo.map(l => `<span class="chip chip-lavender" style="font-size:10px;">${l}</span>`).join('')}
      </div>
    </div>

    <!-- XP Banner -->
    <div class="xp-award-banner">
      <div>
        <div class="xp-award-number">+25 XP</div>
        <div class="xp-award-label">Complete this lesson</div>
        <div class="xp-award-sub">to earn Kitchen Learner badge</div>
      </div>
      <div class="badges-row">
        <div class="badge-item">🍋</div>
        <div class="badge-item">⭐</div>
        <div class="badge-item">🏆</div>
      </div>
    </div>

    <!-- Materials -->
    <div class="interactive-node-card">
      <div class="node-title-area">🧰 Materials Required</div>
      <p class="node-body-text" style="font-size:11px;color:var(--text-muted);">Tap any item to hear its pronunciation</p>
      <div class="materials-grid-pattern">
        ${act.materials.map(m => `
          <div class="material-audio-capsule" onclick="speakText('${m}')">
            <span class="mat-icon-avatar">${getMaterialIcon(m)}</span>
            <span class="mat-label-meta">${m}</span>
            <div class="audio-micro-indicator"><i class="ti ti-volume"></i></div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Hook Teacher Question -->
    <div class="hook-card">
      <div class="hook-label">🎤 Teacher Hook — Open with This</div>
      <div class="hook-text">${act.teacherScript.say}</div>
      <div class="hook-meta">💬 Expected: ${act.teacherScript.expect}</div>
    </div>

    ${state.viewMode === 'teach' ? `
    <!-- Audio Guide Button -->
    <div class="interactive-node-card" style="background:var(--sky);">
      <div class="node-title-area" style="color:var(--sky-dark);">🔊 Audio Introduction Guide</div>
      <p class="node-body-text" style="color:var(--sky-dark);">${act.audioGuide}</p>
      <button class="step-interactive-btn" style="margin-top:10px;background:var(--sky-dark);color:white;border-color:var(--sky-dark);" onclick="speakText('${act.audioGuide.replace(/'/g, "\\'")}')">
        <i class="ti ti-player-play"></i> Play Audio Guide
      </button>
    </div>` : ''}
  `;
}

/* ── TAB: DEMONSTRATION ── */
function renderDemonstration(act) {
  return `
    <!-- Multimedia Hub -->
    <div class="multimedia-hub">
      <div class="media-header-badge">📹 MULTIMEDIA LEARNING HUB</div>
      <div class="video-surface" onclick="playIntroVideo('${act.id}')">
        <i class="ti ti-player-play"></i>
        <span>${act.introVideo.label}</span>
        <span style="font-size:10px;color:#64748b;">${act.introVideo.duration} · Tap to Play</span>
        <div class="video-overlay-timeline"><div class="video-overlay-progress" id="vid-progress-${act.id}"></div></div>
      </div>
      <div class="media-trigger-grid">
        <button class="media-action-btn" onclick="speakText('${act.audioGuide.replace(/'/g, "\\'")}')">
          <i class="ti ti-headphones"></i> Audio Guide
        </button>
        <button class="media-action-btn" onclick="alert('PPT slides loading...')">
          <i class="ti ti-presentation"></i> View PPT
        </button>
        <button class="media-action-btn" onclick="alert('PDF opening...')">
          <i class="ti ti-file-text"></i> Open PDF
        </button>
        <button class="media-action-btn" onclick="alert('Word document opening...')">
          <i class="ti ti-file-word"></i> Open Doc
        </button>
      </div>
    </div>

    <!-- Step Image Preview Cards -->
    ${act.steps.map((s, i) => `
      <div class="interactive-node-card">
        <div class="node-title-area"><span class="step-index-pill">STEP ${i + 1}</span> ${s.title}</div>
        <div class="step-image-placeholder">
          <span style="font-size:28px;">${s.image ? s.image.split(' ')[0] : '📷'}</span>
          <span>${s.image || 'Activity Image'}</span>
        </div>
        <p class="node-body-text">${s.desc}</p>
        <div style="margin-top:8px;display:flex;gap:6px;">
          <button class="step-interactive-btn" onclick="speakText('${s.desc.replace(/'/g, "\\'")}')">
            <i class="ti ti-volume"></i> Listen
          </button>
          <div class="step-duration-tag"><i class="ti ti-clock"></i> ${s.duration}</div>
        </div>
      </div>
    `).join('')}
  `;
}

/* ── TAB: ACTIVITY STEPS ── */
function renderActivitySteps(act) {
  return `
    <div class="step-timeline-container">
      ${act.steps.map((s, i) => {
        var isComplete = state.completedSteps[act.id] && state.completedSteps[act.id][i];
        return `
          <div class="step-card-wrapper" id="step-wrapper-${i}">
            <div class="step-anchor-node ${isComplete ? 'completed' : ''}" id="step-anchor-${i}"></div>
            <div class="step-inner-box ${isComplete ? 'step-completed' : ''}" id="step-box-${i}">
              <div class="step-meta-row">
                <span class="step-index-pill">STEP ${i + 1} · ${s.title.toUpperCase()}</span>
                <div class="timer-display" id="timer-${act.id}-${i}"
                     onclick="toggleStepTimer('${act.id}', ${i}, ${parseDuration(s.duration)})">
                  <i class="ti ti-clock"></i>
                  <span id="timer-text-${act.id}-${i}">${s.duration}</span>
                </div>
              </div>
              <div class="step-image-placeholder">
                <span style="font-size:24px;">${s.image ? s.image.split(' ')[0] : '📷'}</span>
                <span style="font-size:11px;">${s.image || 'Step Visual'}</span>
              </div>
              <p class="node-body-text" style="font-weight:700;color:#111827;">${s.desc}</p>
              <p style="font-size:11px;color:var(--text-muted);margin-top:4px;font-weight:600;">💡 ${s.hint}</p>
              ${s.reflection ? `
                <textarea class="step-reflection-input" placeholder="Student reflection: ${s.reflection}" rows="2"
                  id="reflect-${act.id}-${i}" onchange="saveReflection('${act.id}', ${i}, this.value)"></textarea>
              ` : ''}
              <div class="step-action-footer">
                <button class="step-interactive-btn" onclick="speakText('${s.desc.replace(/'/g, "\\'")}')">
                  <i class="ti ti-volume"></i> Audio
                </button>
                <button class="step-interactive-btn" onclick="startVoiceForStep(${i})">
                  <i class="ti ti-microphone"></i> Voice
                </button>
                <button class="step-interactive-btn complete-trigger-btn ${isComplete ? 'completed-status' : ''}"
                  id="complete-btn-${act.id}-${i}"
                  onclick="markStepComplete('${act.id}', ${i})">
                  <i class="ti ti-${isComplete ? 'check' : 'circle-check'}"></i>
                  ${isComplete ? 'Done ✓' : 'Mark Done'}
                </button>
              </div>
            </div>
          </div>`;
      }).join('')}
    </div>
  `;
}

/* ══════════════════════════════════════════════════════
   INTEGRATION: PERIOD 1 & PERIOD 2 FULL SCREEN VIEWS
   ══════════════════════════════════════════════════════ */

// Central state matrix for monitoring active screens tracker
var lessonPeriodRoutingState = 0; // 0 = Core Dashboard Tabs, 1 = Period 1 Master View, 2 = Period 2 Master View

function directPeriodRoute(periodNum) {
  lessonPeriodRoutingState = periodNum;
  
  // Highlight correct footer period button
  document.querySelectorAll('.period-toggle-btn').forEach(function(btn) { btn.classList.remove('active'); });
  if (periodNum === 1) document.getElementById('foot-p1-btn').classList.add('active');
  if (periodNum === 2) document.getElementById('foot-p2-btn').classList.add('active');

  // Deactivate tab strip — period screens are independent
  document.querySelectorAll('#lesson-tabs .tab-btn').forEach(function(b) { b.classList.remove('active'); });

  renderLessonContent();
}

// Intercept tab switches engine to clear screen routing back to default container profiles
var originalSwitchLessonView = switchLessonView;
switchLessonView = function(name, btn) {
  lessonPeriodRoutingState = 0; // reset routing bypass flags
  document.querySelectorAll('.period-toggle-btn').forEach(function(b) { b.classList.remove('active'); });
  originalSwitchLessonView(name, btn);
};

// Intercept core structural renderer pipeline engine seamlessly
var coreRenderTabBypass = renderTab;
renderTab = function(act, tab) {
  // If explicitly routing to individual period views pages
  if (lessonPeriodRoutingState === 1) {
    return `
      <div class="period-independent-view active-period">
        <div class="section-banner" style="background:var(--yellow); color:var(--yellow-dark); margin-bottom:16px;">
          <span class="section-banner-icon">⏰</span>
          <div>
            <div class="section-banner-title" style="font-size:18px;">Period 1 — 35 min</div>
            <div class="section-banner-sub">Curiosity Hook & Introductory Core Concepts</div>
          </div>
        </div>

        <div class="tip-card" style="background:#fff7ed; border-color:#fed7aa; margin-bottom:12px;">
          <div class="recap-num" style="background:var(--coral-dark);">1-7</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--coral-dark);">The Closed Tiffin Mystery (Curiosity Hook)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>SETUP:</b> Enter class carrying a closed steel tiffin. Place on table. Do NOT open it. Write on board: <i>"Can you become a chef without cooking?"</i></p>
            <span class="chip chip-coral" style="margin-top:8px; font-size:10px;">Teacher script + tips</span>
          </div>
        </div>

        <div class="tip-card" style="background:#fffbeb; border-color:#fde68a; margin-bottom:12px;">
          <div class="recap-num" style="background:var(--yellow-dark);">8-15</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--yellow-dark);">Maharashtra Food Map (Food Journey)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>ACTIVITY:</b> Draw Maharashtra map on board. Ask: "If we travel across Maharashtra, what foods will we find?" Build list by region.</p>
            <span class="chip chip-yellow" style="margin-top:8px; font-size:10px;">Regional foods + questions</span>
          </div>
        </div>

        <div class="tip-card" style="background:var(--mint); border-color:var(--mint-mid); margin-bottom:12px;">
          <div class="recap-num" style="background:var(--mint-dark);">16-20</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--mint-dark);">What Is a Recipe? (p.128 Core Concept)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>KEY DEFINITION:</b> <b>Recipe</b> = a set of instructions that tells us how to make a dish. It has ingredients + quantities + steps to follow.</p>
            <span class="chip chip-mint" style="margin-top:8px; font-size:10px;">3-part diagram + questions</span>
          </div>
        </div>

        <div class="tip-card" style="background:var(--lavender); border-color:var(--lavender-mid); margin-bottom:12px;">
          <div class="recap-num" style="background:var(--lavender-dark);">21-32</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--lavender-dark);">Recipe Detective — Koshimbir (p.132 Recipe Reading)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>INSTRUCTION:</b> Open textbook p.132. Students read Koshimbir recipe silently for 3 min. Then answer Recipe Detective questions.</p>
            <span class="chip chip-lavender" style="margin-top:8px; font-size:10px;">Full recipe + detective questions</span>
          </div>
        </div>

        <div class="tip-card" style="background:#f3f4f6; border-color:var(--border); margin-bottom:16px;">
          <div class="recap-num" style="background:var(--text-muted);">33-35</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--text-muted);">Quick Reflection (Wrap-up)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>CLOSING SCRIPT:</b> "Can anyone become a chef just by guessing ingredients? Next period — we discover what happens when recipes go wrong!"</p>
          </div>
        </div>

        <button class="submit-evaluation-btn" style="background:var(--peach-dark); margin-top:4px;" onclick="directPeriodRoute(2)">
          Go to Period 2 →
        </button>
      </div>`;
  }
  
  if (lessonPeriodRoutingState === 2) {
    return `
      <div class="period-independent-view active-period">
        <div class="section-banner" style="background:var(--peach); color:var(--peach-dark); margin-bottom:16px;">
          <span class="section-banner-icon">⚡</span>
          <div>
            <div class="section-banner-title" style="font-size:18px;">Period 2 — 35 min</div>
            <div class="section-banner-sub">Interactive Practical Challenges & Delivery Evaluation</div>
          </div>
        </div>

        <div class="tip-card" style="background:#fff7ed; border-color:#fed7aa; margin-bottom:12px;">
          <div class="recap-num" style="background:var(--coral-dark);">1-8</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--coral-dark);">Recipe Disaster Game (Sequence Game)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>BOARD WORK:</b> Write these sandwich steps in WRONG order on board. Students must rearrange.</p>
            <span class="chip chip-coral" style="margin-top:8px; font-size:10px;">Scrambled steps + activity</span>
          </div>
        </div>

        <div class="tip-card" style="background:#fffbeb; border-color:#fde68a; margin-bottom:12px;">
          <div class="recap-num" style="background:var(--yellow-dark);">9-18</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--yellow-dark);">Mixing vs Spreading vs Assembling (Methods)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>TEXTBOOK P.128:</b> Three methods taught in Activity 1. Use hand gestures with students.</p>
            <span class="chip chip-yellow" style="margin-top:8px; font-size:10px;">Method cards + examples</span>
          </div>
        </div>

        <div class="tip-card" style="background:var(--lavender); border-color:var(--lavender-mid); margin-bottom:12px;">
          <div class="recap-num" style="background:var(--lavender-dark);">19-25</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--lavender-dark);">Recipe Detective Challenge (Group Work)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;">Identify logic structural anomalies within faulty recipes template layout sets.</p>
            <span class="chip chip-lavender" style="margin-top:8px; font-size:10px;">Group roles + task</span>
          </div>
        </div>

        <div class="tip-card" style="background:var(--mint); border-color:var(--mint-mid); margin-bottom:12px;">
          <div class="recap-num" style="background:var(--mint-dark);">26-30</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--mint-dark);">Career Connection (Careers)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>TEACHER PROMPT:</b> "Who uses recipes in their job every single day?" Build list with students. Connect to local community.</p>
            <span class="chip chip-mint" style="margin-top:8px; font-size:10px;">Career cards</span>
          </div>
        </div>

        <div class="tip-card" style="background:#f3f4f6; border-color:var(--border); margin-bottom:16px;">
          <div class="recap-num" style="background:var(--peach-dark);">31-35</div>
          <div class="tip-text" style="color:var(--text); flex:1;">
            <div style="font-weight:800; font-size:14px; color:var(--peach-dark);">Exit Ticket (Assessment)</div>
            <p style="font-size:12px; margin-top:4px; line-height:1.5;"><b>INSTRUCTION:</b> Students write 5 answers in notebook. Individual work. No discussion.</p>
            <span class="chip chip-sky" style="margin-top:8px; font-size:10px;">Interactive quiz</span>
          </div>
        </div>

        <button class="submit-evaluation-btn" style="background:var(--yellow-dark);" onclick="directPeriodRoute(1)">
          ← Return to Period 1
        </button>
      </div>`;
  }

  return coreRenderTabBypass(act, tab);
};

// Overwrite standard list dashboard generator view to allow seamless routing actions via full-card hits
function renderSessionsLearningPlan(act) {
  var periodMins = (state.advancedOptions && state.advancedOptions.periodDuration) ? state.advancedOptions.periodDuration : 35;
  var totalMins = periodMins * act.periods;

  var html = '<div style="padding:12px 14px 4px;">';
  html += '<div class="session-activity-card">';
  html += '<div style="display:flex;align-items:center;gap:12px;flex:1;">';
  html += '<div class="session-activity-icon" style="background:var(--yellow);">📖</div>';
  html += '<div><div style="font-size:14px;font-weight:700;color:var(--text);">' + act.name + '</div>';
  html += '<div style="font-size:11px;color:var(--text-muted);margin-top:2px;">' + act.lo.slice(0,3).join(' · ') + ' · Groups of 4–5</div></div></div>';
  html += '<span class="chip chip-yellow">' + act.periods + ' periods</span>';
  html += '</div></div>';

  /* Clickable First Half Plan Card Box Block */
  html += '<div class="session-half-label" style="color:var(--mint-dark);">First Half — ' + Math.round(totalMins / 2) + ' Minutes</div>';
  html += '<div class="session-split-block clickable-plan-card" onclick="directPeriodRoute(1)">';
  html += '<div class="session-split-header" style="background:var(--mint);">';
  html += '<div class="session-split-num" style="background:var(--mint-dark);">1</div>';
  html += '<div><div class="session-split-title" style="font-weight:800;">Period 1</div><div class="session-split-sub">' + Math.round(totalMins / 2) + ' Mins · First Half — Learning Plan</div></div>';
  html += '</div>';
  html += '<div class="session-seg-bar">';
  html += '<div class="session-seg" style="flex:3;background:#6bbf8e;"><span class="session-seg-label">Intro</span><span class="session-seg-time">8 m</span></div>';
  html += '<div class="session-seg" style="flex:5;background:#2d7d52;"><span class="session-seg-label">Demo</span><span class="session-seg-time">15 m</span></div>';
  html += '<div class="session-seg" style="flex:4;background:#1a5c3a;"><span class="session-seg-label">Practice</span><span class="session-seg-time">12 m</span></div>';
  html += '</div>';
  html += '<div class="session-step-list">';
  html += '<div class="session-step-item"><div class="session-step-dot" style="background:var(--mint-dark);"></div><div class="session-step-text"><b>Closed Tiffin Hook:</b> Introduction riddle session inside structural focus boundaries.</div></div>';
  html += '<div class="session-step-item"><div class="session-step-dot" style="background:var(--mint-dark);"></div><div class="session-step-text"><b>Core Concept Mapping:</b> Definition exploration matching standard recipe mechanics.</div></div>';
  html += '</div></div>';

  /* Clickable Second Half Plan Card Box Block */
  html += '<div class="session-half-label" style="color:var(--peach-dark);">Second Half — ' + Math.round(totalMins / 2) + ' Minutes</div>';
  html += '<div class="session-split-block clickable-plan-card" onclick="directPeriodRoute(2)">';
  html += '<div class="session-split-header" style="background:var(--peach);">';
  html += '<div class="session-split-num" style="background:var(--peach-dark);">2</div>';
  html += '<div><div class="session-split-title" style="font-weight:800;">Period 2</div><div class="session-split-sub">' + Math.round(totalMins / 2) + ' Mins · Second Half — Execution</div></div>';
  html += '</div>';
  html += '<div class="session-seg-bar">';
  html += '<div class="session-seg" style="flex:5;background:#f4a47a;"><span class="session-seg-label">Activity</span><span class="session-seg-time">18 m</span></div>';
  html += '<div class="session-seg" style="flex:3;background:#c0573a;"><span class="session-seg-label">Share</span><span class="session-seg-time">12 m</span></div>';
  html += '<div class="session-seg" style="flex:2;background:#8b3520;"><span class="session-seg-label">Clean</span><span class="session-seg-time">5 m</span></div>';
  html += '</div>';
  html += '<div class="session-step-list">';
  html += '<div class="session-step-item"><div class="session-step-dot" style="background:var(--peach-dark);"></div><div class="session-step-text"><b>Recipe Disaster Game:</b> Reordering sequencing drills active parameters.</div></div>';
  html += '<div class="session-step-item"><div class="session-step-dot" style="background:var(--peach-dark);"></div><div class="session-step-text"><b>Methods Evaluation:</b> Mixing, Spreading vs Assembling practical gestures processing.</div></div>';
  html += '</div></div>';

  return html;
}

/* ── TAB: GROUP WORK ── */
function renderGroupWork(act) {
  var gw = act.groupWork;
  return `
    <div class="group-banner">
      <div class="group-banner-title"><i class="ti ti-users"></i> ${gw.title}</div>
      <div class="group-banner-sub">${gw.description}</div>
    </div>

    <!-- Timer -->
    <div class="interactive-node-card" style="background:#fffbeb;">
      <div class="node-title-area" style="color:#d97706;"><i class="ti ti-clock"></i> Group Activity Timer</div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div class="timer-display" id="group-timer-display" style="font-size:20px;padding:10px 18px;">
          <i class="ti ti-clock"></i>
          <span id="group-timer-text">${formatTime(gw.timer)}</span>
        </div>
        <button class="step-interactive-btn complete-trigger-btn" style="flex:1;" onclick="toggleGroupTimer(${gw.timer})">
          <i class="ti ti-player-play" id="group-timer-icon"></i> Start Timer
        </button>
      </div>
    </div>

    <!-- Role Cards -->
    <div class="interactive-node-card">
      <div class="node-title-area">👥 Group Roles — Tap to Assign</div>
      <div class="role-allocation-grid">
        ${gw.roles.map((r, i) => `
          <div class="role-toggle-pod" id="role-pod-${i}" onclick="toggleRole(${i})">
            <span class="role-icon">${r.icon}</span>
            <div style="font-size:12px;font-weight:800;">${r.title}</div>
            <div style="font-size:10px;font-weight:600;margin-top:3px;line-height:1.3;">${r.task}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Collaboration Tips -->
    <div class="interactive-node-card" style="background:var(--lavender);">
      <div class="node-title-area" style="color:var(--lavender-dark);">🤝 Collaboration Guide</div>
      <p class="node-body-text" style="color:var(--lavender-dark);">Each member must speak at least once. Rotate roles every session. Score your team on communication at the end.</p>
      <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;">
        <span class="chip" style="background:white;color:var(--lavender-dark);">🗣️ Speak Up</span>
        <span class="chip" style="background:white;color:var(--lavender-dark);">👂 Listen</span>
        <span class="chip" style="background:white;color:var(--lavender-dark);">🙌 Respect</span>
      </div>
    </div>
  `;
}

/* ── TAB: DISCUSSION ── */
function renderDiscussion(act) {
  return `
    <div class="section-banner" style="background:var(--sky);color:var(--sky-dark);">
      <span class="section-banner-icon">💬</span>
      <div>
        <div class="section-banner-title">Discussion Questions</div>
        <div class="section-banner-sub">Tap mic to record your voice answer</div>
      </div>
    </div>
    ${act.discussionQuestions.map((q, i) => `
      <div class="discussion-card">
        <div class="discussion-question">Q${i + 1}. ${q}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="voice-answer-btn" onclick="startVoiceForDiscussion(${i})">
            <i class="ti ti-microphone"></i> Speak Your Answer
          </button>
          <button class="voice-answer-btn" style="border-style:solid;" onclick="speakText('${q.replace(/'/g, "\\'")}')">
            <i class="ti ti-volume"></i> Read Question
          </button>
        </div>
        <div id="discuss-answer-${i}" style="margin-top:8px;font-size:11.5px;color:var(--sky-dark);font-weight:600;min-height:16px;"></div>
      </div>
    `).join('')}
  `;
}

/* ── TAB: CONCLUSION ── */
function renderConclusion(act) {
  return `
    <div class="section-banner" style="background:var(--mint);color:var(--mint-dark);">
      <span class="section-banner-icon">✅</span>
      <div>
        <div class="section-banner-title">What We Learned Today</div>
        <div class="section-banner-sub">Quick recap of key takeaways</div>
      </div>
    </div>
    ${act.conclusion.map((c, i) => `
      <div class="recap-card">
        <div class="recap-num">${i + 1}</div>
        <div class="recap-text">${c}</div>
      </div>
    `).join('')}
    <div class="interactive-node-card" style="background:linear-gradient(135deg,var(--mint),#d4f0e4);margin-top:4px;">
      <div class="node-title-area" style="color:var(--mint-dark);">🎉 Lesson Complete!</div>
      <p class="node-body-text" style="color:var(--mint-dark);">Tap the button below to award XP points and mark this lesson as complete.</p>
      <button class="submit-evaluation-btn" style="background:var(--mint-dark);margin-top:10px;" onclick="completeLessonAndAwardXP()">
        🏆 Complete Lesson & Earn +25 XP
      </button>
    </div>
  `;
}

/* ── TAB: ASSESSMENT ── */
function renderAssessment(act) {
  var html = `
    <div class="section-banner" style="background:var(--peach);color:var(--peach-dark);">
      <span class="section-banner-icon">📝</span>
      <div>
        <div class="section-banner-title">Activity Assessment</div>
        <div class="section-banner-sub">${act.assessments.length} assessment tasks</div>
      </div>
    </div>
    <div class="assessment-container">`;

  act.assessments.forEach((a, qi) => {
    if (a.type === 'mcq') {
      html += renderMCQ(a, qi);
    } else if (a.type === 'drag') {
      html += renderDragDrop(a, qi);
    } else if (a.type === 'match') {
      html += renderMatch(a, qi);
    } else if (a.type === 'voice') {
      html += renderVoiceAssessment(a, qi);
    } else if (a.type === 'upload') {
      html += renderUpload(a, qi);
    }
  });

  html += `
    </div>
    <button class="submit-evaluation-btn" onclick="submitAssessment()">
      <i class="ti ti-send"></i> Submit All Answers
    </button>`;
  return html;
}

function renderMCQ(a, qi) {
  return `
    <div class="assessment-card">
      <div class="assessment-type-badge badge-mcq"><i class="ti ti-list-check"></i> MCQ</div>
      <div class="assessment-prompt-text">Q${qi + 1}. ${a.question}</div>
      ${a.options.map((opt, oi) => `
        <div class="option-select-row" id="opt-${qi}-${oi}" onclick="selectMCQ(${qi}, ${oi}, ${a.correct})">
          <div class="option-marker-circle"></div>
          <span>${opt}</span>
        </div>
      `).join('')}
    </div>`;
}

function renderDragDrop(a, qi) {
  var shuffled = [...a.items].sort(() => Math.random() - 0.5);
  return `
    <div class="assessment-card">
      <div class="assessment-type-badge badge-drag"><i class="ti ti-sort-ascending"></i> Arrange Steps</div>
      <div class="assessment-prompt-text">Q${qi + 1}. ${a.question}</div>
      <p style="font-size:11px;color:var(--text-muted);margin-bottom:6px;font-weight:600;">Hold & drag to reorder ↕</p>
      <div class="drag-drop-sequence-list" id="drag-list-${qi}">
        ${shuffled.map((item, di) => `
          <div class="sequence-movable-node" draggable="true"
               data-index="${di}" data-qi="${qi}"
               ontouchstart="touchDragStart(event)"
               ontouchmove="touchDragMove(event)"
               ontouchend="touchDragEnd(event)"
               ondragstart="onDragStart(event)" ondragover="onDragOver(event)" ondrop="onDrop(event)">
            <span>${item}</span>
            <i class="ti ti-grip-vertical"></i>
          </div>
        `).join('')}
      </div>
    </div>`;
}

function renderMatch(a, qi) {
  return `
    <div class="assessment-card">
      <div class="assessment-type-badge badge-match"><i class="ti ti-arrows-left-right"></i> Match the Following</div>
      <div class="assessment-prompt-text">Q${qi + 1}. ${a.question}</div>
      <div class="match-container">
        <div class="match-col">
          <div class="match-col-header">Column A</div>
          ${a.left.map((item, li) => `
            <div class="match-item" id="match-left-${qi}-${li}"
                 onclick="selectMatchItem('left', ${qi}, ${li}, '${item.replace(/'/g, "\\'")}')">
              ${item}
            </div>
          `).join('')}
        </div>
        <div class="match-col">
          <div class="match-col-header">Column B</div>
          ${a.right.map((item, ri) => `
            <div class="match-item" id="match-right-${qi}-${ri}"
                 onclick="selectMatchItem('right', ${qi}, ${ri}, '${item.replace(/'/g, "\\'")}')">
              ${item}
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function renderVoiceAssessment(a, qi) {
  return `
    <div class="assessment-card">
      <div class="voice-assessment-card">
        <div class="assessment-type-badge badge-voice" style="margin:0 auto 10px;"><i class="ti ti-microphone"></i> Voice Answer</div>
        <div class="voice-assess-prompt">Q${qi + 1}. ${a.question}</div>
        <button class="voice-record-btn" id="voice-assess-btn-${qi}" onclick="recordVoiceAnswer(${qi})">
          <i class="ti ti-microphone"></i>
        </button>
        <p style="font-size:10px;color:#94a3b8;margin-top:10px;font-weight:600;">Tap to Record · Tap again to Stop</p>
        <div id="voice-answer-text-${qi}" style="margin-top:8px;font-size:12px;color:#94a3b8;font-weight:600;min-height:24px;"></div>
      </div>
    </div>`;
}

function renderUpload(a, qi) {
  return `
    <div class="assessment-card">
      <div class="assessment-type-badge badge-upload"><i class="ti ti-photo"></i> Upload Activity</div>
      <div class="assessment-prompt-text">Q${qi + 1}. ${a.question}</div>
      <div class="upload-zone" onclick="triggerImageUpload(${qi})">
        <i class="ti ti-camera-plus"></i>
        <span>Tap to take a photo or upload from gallery</span>
      </div>
      <input type="file" accept="image/*" id="upload-input-${qi}" style="display:none;" onchange="previewUpload(${qi}, this)">
      <div id="upload-preview-${qi}"></div>
    </div>`;
}

/* ── TAB: CLASSROOM TIPS ── */
function renderClassroomTips(act) {
  var ct = act.classroomTips;
  return `
    <div class="section-banner" style="background:var(--lavender);color:var(--lavender-dark);">
      <span class="section-banner-icon">💡</span>
      <div>
        <div class="section-banner-title">Classroom Tips</div>
        <div class="section-banner-sub">For experienced teaching delivery</div>
      </div>
    </div>

    <div class="tips-category">
      <div class="tips-category-title"><i class="ti ti-notebook"></i> Teacher Notes</div>
      ${ct.teacherNotes.map(t => `
        <div class="tip-card"><span class="tip-icon">📌</span><span class="tip-text">${t}</span></div>
      `).join('')}
    </div>

    <div class="tips-category">
      <div class="tips-category-title"><i class="ti ti-alert-triangle"></i> Common Mistakes</div>
      ${ct.commonMistakes.map(m => `
        <div class="tip-card" style="background:#fff7ed;border-color:#fed7aa;"><span class="tip-icon">⚠️</span><span class="tip-text" style="color:#9a3412;">${m}</span></div>
      `).join('')}
    </div>

    <div class="tips-category">
      <div class="tips-category-title"><i class="ti ti-shield-check"></i> Safety Reminders</div>
      ${ct.safetyReminders.map(s => `
        <div class="safety-alert"><span class="safety-alert-icon">🛡️</span><span class="safety-alert-text">${s}</span></div>
      `).join('')}
    </div>

    <div class="tips-category">
      <div class="tips-category-title"><i class="ti ti-clock"></i> Time Management</div>
      ${ct.timeManagement.map(t => `
        <div class="tip-card" style="background:var(--mint);border-color:var(--mint-mid);"><span class="tip-icon">⏱️</span><span class="tip-text" style="color:var(--mint-dark);">${t}</span></div>
      `).join('')}
    </div>
  `;
}

/* ── TAB: DOWNLOADS ── */
function renderDownloads(act) {
  var typeMap = {
    'pdf': { icon: 'ti-file-text', css: 'pdf-type', label: 'PDF' },
    'ppt': { icon: 'ti-presentation', css: 'ppt-type', label: 'PowerPoint' },
    'doc': { icon: 'ti-file-word', css: 'doc-type', label: 'Word Doc' },
    'xlsx': { icon: 'ti-table', css: 'xlsx-type', label: 'Excel' }
  };
  return `
    <div class="section-banner" style="background:var(--peach);color:var(--peach-dark);">
      <span class="section-banner-icon">📥</span>
      <div>
        <div class="section-banner-title">Lesson Downloads</div>
        <div class="section-banner-sub">${act.downloads.length} resources available</div>
      </div>
    </div>
    <div class="download-deck-grid">
      ${act.downloads.map(d => {
        var t = typeMap[d.type] || typeMap['pdf'];
        return `
          <div class="download-asset-card ${t.css}" onclick="triggerDownloadAsset('${d.name}', '${d.type}')">
            <i class="ti ${t.icon}"></i>
            <div class="download-asset-title">${d.name}</div>
            <div class="download-asset-size">${d.size} · ${t.label}</div>
            <button class="download-btn-sm"><i class="ti ti-download"></i> Download</button>
          </div>`;
      }).join('')}
    </div>
    <!-- Extra Quick Downloads -->
    <div class="interactive-node-card" style="margin-top:12px;">
      <div class="node-title-area">⚡ Quick Generate</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <button class="step-interactive-btn" style="background:var(--coral);color:var(--coral-dark);border-color:var(--coral-mid);" onclick="triggerDownload('PDF')">
          <i class="ti ti-file-pdf"></i> Auto-Generate Lesson PDF
        </button>
        <button class="step-interactive-btn" style="background:var(--peach);color:var(--peach-dark);border-color:var(--peach-mid);" onclick="triggerDownload('PPT')">
          <i class="ti ti-presentation"></i> Auto-Generate PPT Slides
        </button>
        <button class="step-interactive-btn" style="background:var(--sky);color:var(--sky-dark);border-color:var(--sky-mid);" onclick="triggerDownload('Worksheet')">
          <i class="ti ti-file-text"></i> Student Worksheet
        </button>
      </div>
    </div>
  `;
}

/* ══════════════════════════
   INTERACTIVITY WIRING
   ══════════════════════════ */
function wireInteractivity() {
  /* Wire drag-drop lists */
  document.querySelectorAll('.drag-drop-sequence-list').forEach(list => {
    wireDropzone(list);
  });
}

/* ── MCQ HANDLER ── */
function selectMCQ(qi, oi, correct) {
  document.querySelectorAll(`[id^="opt-${qi}-"]`).forEach(el => {
    el.classList.remove('selected-correct', 'selected-wrong');
  });
  var chosen = document.getElementById(`opt-${qi}-${oi}`);
  if (oi === correct) {
    chosen.classList.add('selected-correct');
    showToast('✅', 'Correct Answer!', '+5 XP earned');
    awardXP(5);
  } else {
    chosen.classList.add('selected-wrong');
    var correctEl = document.getElementById(`opt-${qi}-${correct}`);
    if (correctEl) setTimeout(() => correctEl.classList.add('selected-correct'), 600);
  }
}

/* ── MATCH HANDLER ── */
function selectMatchItem(side, qi, idx, val) {
  state.matchSelected[side] = { qi, idx, val };
  document.getElementById(`match-${side}-${qi}-${idx}`).classList.add('selected');

  if (state.matchSelected.left && state.matchSelected.right && state.matchSelected.left.qi === state.matchSelected.right.qi) {
    var leftEl = document.getElementById(`match-left-${qi}-${state.matchSelected.left.idx}`);
    var rightEl = document.getElementById(`match-right-${qi}-${state.matchSelected.right.idx}`);
    leftEl.classList.remove('selected'); leftEl.classList.add('matched');
    rightEl.classList.remove('selected'); rightEl.classList.add('matched');
    state.matchSelected = { left: null, right: null };
    showToast('🎯', 'Match Found!', '+3 XP');
    awardXP(3);
  }
}

/* ── DRAG DROP ── */
function onDragStart(e) {
  state.dragSrc = e.target;
  e.dataTransfer.effectAllowed = 'move';
  e.target.classList.add('dragging');
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  document.querySelectorAll('.sequence-movable-node').forEach(n => n.classList.remove('drag-over'));
  if (e.currentTarget !== state.dragSrc) e.currentTarget.classList.add('drag-over');
  return false;
}

function onDrop(e) {
  e.preventDefault();
  var target = e.currentTarget;
  if (target !== state.dragSrc) {
    var list = target.parentNode;
    var nodes = Array.from(list.querySelectorAll('.sequence-movable-node'));
    var srcIdx = nodes.indexOf(state.dragSrc);
    var tgtIdx = nodes.indexOf(target);
    if (srcIdx < tgtIdx) list.insertBefore(state.dragSrc, target.nextSibling);
    else list.insertBefore(state.dragSrc, target);
  }
  document.querySelectorAll('.sequence-movable-node').forEach(n => { n.classList.remove('dragging', 'drag-over'); });
  state.dragSrc = null;
}

/* Touch drag support */
var touchItem = null, touchClone = null, touchList = null;
function touchDragStart(e) {
  touchItem = e.currentTarget;
  touchList = touchItem.parentNode;
  touchClone = touchItem.cloneNode(true);
  touchClone.style.cssText = 'position:fixed;opacity:0.75;pointer-events:none;z-index:9999;width:' + touchItem.offsetWidth + 'px;';
  document.body.appendChild(touchClone);
  touchItem.classList.add('dragging');
}
function touchDragMove(e) {
  if (!touchClone) return;
  e.preventDefault();
  var touch = e.touches[0];
  touchClone.style.left = (touch.clientX - touchItem.offsetWidth / 2) + 'px';
  touchClone.style.top  = (touch.clientY - 30) + 'px';
}
function touchDragEnd(e) {
  if (!touchClone) return;
  var touch = e.changedTouches[0];
  touchClone.remove(); touchClone = null;
  touchItem.classList.remove('dragging');
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  var node = target ? target.closest('.sequence-movable-node') : null;
  if (node && node !== touchItem && node.parentNode === touchList) {
    var nodes = Array.from(touchList.querySelectorAll('.sequence-movable-node'));
    var si = nodes.indexOf(touchItem), ti = nodes.indexOf(node);
    if (si < ti) touchList.insertBefore(touchItem, node.nextSibling);
    else touchList.insertBefore(touchItem, node);
  }
  touchItem = null;
}

function wireDropzone(list) {
  list.addEventListener('dragover', e => e.preventDefault());
}

/* ── STEP COMPLETE ── */
function markStepComplete(actId, stepIdx) {
  if (!state.completedSteps[actId]) state.completedSteps[actId] = {};
  state.completedSteps[actId][stepIdx] = true;

  var btn = document.getElementById(`complete-btn-${actId}-${stepIdx}`);
  var anchor = document.getElementById(`step-anchor-${stepIdx}`);
  var box = document.getElementById(`step-box-${stepIdx}`);
  if (btn) { btn.classList.add('completed-status'); btn.innerHTML = '<i class="ti ti-check"></i> Done ✓'; }
  if (anchor) anchor.classList.add('completed');
  if (box) box.classList.add('step-completed');
  showToast('⭐', 'Step Complete!', '+10 XP earned');
  awardXP(10);
}

/* ── VOICE RECORDING ── */
var recognition = null;
var voiceTarget = null;

function setupRecognition(onResult, onEnd) {
  var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) { alert('Voice input is not supported in this browser. Use Chrome or Edge.'); return null; }
  var rec = new SpeechRec();
  rec.lang = 'en-IN';
  rec.interimResults = true;
  rec.onresult = onResult;
  rec.onend = onEnd || function() {};
  return rec;
}

function toggleVoiceInput() {
  if (recognition) { stopVoiceInput(); return; }
  document.getElementById('voice-modal').classList.add('active');
  document.getElementById('voice-float-btn').classList.add('recording');
  document.getElementById('voice-result-text').textContent = 'Speak now...';

  recognition = setupRecognition(function(e) {
    var transcript = '';
    for (var i = e.resultIndex; i < e.results.length; i++) {
      transcript += e.results[i][0].transcript;
    }
    document.getElementById('voice-result-text').textContent = transcript;
  }, function() {
    stopVoiceInput();
  });
  if (recognition) recognition.start();
}

function stopVoiceInput() {
  if (recognition) { recognition.stop(); recognition = null; }
  document.getElementById('voice-modal').classList.remove('active');
  document.getElementById('voice-float-btn').classList.remove('recording');
}

function startVoiceForStep(stepIdx) {
  var rec = setupRecognition(function(e) {
    var t = e.results[e.results.length - 1][0].transcript;
    var el = document.getElementById(`reflect-${state.activity.id}-${stepIdx}`);
    if (el) el.value = t;
  });
  if (rec) rec.start();
  showToast('🎤', 'Listening for Step ' + (stepIdx + 1), 'Speak your reflection');
}

function startVoiceForDiscussion(idx) {
  var rec = setupRecognition(function(e) {
    var t = e.results[e.results.length - 1][0].transcript;
    var el = document.getElementById(`discuss-answer-${idx}`);
    if (el) el.textContent = '🎤 "' + t + '"';
  });
  if (rec) rec.start();
  showToast('🎤', 'Recording Answer', 'Speak clearly');
}

function startVoiceForChat() {
  var btn = document.getElementById('chat-voice-btn');
  var inp = document.getElementById('ai-custom-input');
  if (!btn || !inp) return;
  btn.classList.add('recording');
  var rec = setupRecognition(function(e) {
    inp.value = e.results[e.results.length - 1][0].transcript;
  }, function() {
    btn.classList.remove('recording');
  });
  if (rec) rec.start();
}

function recordVoiceAnswer(qi) {
  var btn = document.getElementById(`voice-assess-btn-${qi}`);
  var out = document.getElementById(`voice-answer-text-${qi}`);
  if (!btn || !out) return;
  btn.classList.add('recording');
  var rec = setupRecognition(function(e) {
    out.textContent = '🎤 "' + e.results[e.results.length - 1][0].transcript + '"';
  }, function() { btn.classList.remove('recording'); });
  if (rec) rec.start();
}

/* ── SPEECH SYNTHESIS ── */
function speakText(txt) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(txt);
  u.lang = 'en-IN';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

/* ── TIMERS ── */
function parseDuration(str) {
  var match = str.match(/(\d+)/);
  return match ? parseInt(match[1]) * 60 : 600;
}

function formatTime(secs) {
  var m = Math.floor(secs / 60);
  var s = secs % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}

var stepTimerIntervals = {};
function toggleStepTimer(actId, stepIdx, totalSecs) {
  var key = actId + '-' + stepIdx;
  var display = document.getElementById(`timer-${actId}-${stepIdx}`);
  var text = document.getElementById(`timer-text-${actId}-${stepIdx}`);
  if (!display || !text) return;

  if (stepTimerIntervals[key]) {
    clearInterval(stepTimerIntervals[key]);
    delete stepTimerIntervals[key];
    display.classList.remove('running');
    return;
  }

  var remaining = totalSecs;
  display.classList.add('running');
  text.textContent = formatTime(remaining);

  stepTimerIntervals[key] = setInterval(function() {
    remaining--;
    text.textContent = formatTime(remaining);
    if (remaining <= 0) {
      clearInterval(stepTimerIntervals[key]);
      delete stepTimerIntervals[key];
      display.classList.remove('running');
      text.textContent = '✅ Done';
      speakText('Time is up! Step completed.');
    }
  }, 1000);
}

var groupTimerInterval = null, groupTimerRunning = false;
function toggleGroupTimer(totalSecs) {
  var text = document.getElementById('group-timer-text');
  var icon = document.getElementById('group-timer-icon');
  var display = document.getElementById('group-timer-display');
  if (!text || !display) return;

  if (groupTimerRunning) {
    clearInterval(groupTimerInterval);
    groupTimerRunning = false;
    if (icon) icon.className = 'ti ti-player-play';
    display.classList.remove('running');
    return;
  }

  var remaining = totalSecs;
  groupTimerRunning = true;
  if (icon) icon.className = 'ti ti-player-pause';
  display.classList.add('running');

  groupTimerInterval = setInterval(function() {
    remaining--;
    if (text) text.textContent = formatTime(remaining);
    if (remaining <= 0) {
      clearInterval(groupTimerInterval);
      groupTimerRunning = false;
      if (text) text.textContent = '✅ Done!';
      display.classList.remove('running');
      speakText('Group activity time is up! Please wrap up and present your work.');
    }
  }, 1000);
}

/* ── ROLE TOGGLE ── */
function toggleRole(idx) {
  var pod = document.getElementById(`role-pod-${idx}`);
  if (pod) pod.classList.toggle('active-pod');
}

/* ── GAMIFICATION ── */
function awardXP(amount) {
  state.xp += amount;
  var el1 = document.getElementById('lesson-xp');
  var el2 = document.getElementById('xp-count');
  if (el1) el1.textContent = state.xp;
  if (el2) el2.textContent = state.xp;

  /* Badge milestones */
  if (state.xp >= 200 && !state.badges.includes('Kitchen Learner')) {
    state.badges.push('Kitchen Learner');
    setTimeout(() => showToast('🍳', 'Badge Unlocked!', 'Kitchen Learner'), 500);
  }
  if (state.xp >= 300 && !state.badges.includes('Recipe Reader')) {
    state.badges.push('Recipe Reader');
    setTimeout(() => showToast('📖', 'Badge Unlocked!', 'Recipe Reader'), 500);
  }
}

function completeLessonAndAwardXP() {
  awardXP(25);
  state.completedSteps[state.activity.id] = state.completedSteps[state.activity.id] || {};
  state.completedSteps[state.activity.id]['lesson'] = true;
  showToast('🏆', 'Lesson Complete!', '+25 XP · Kitchen Champion');
  var badge = document.getElementById('lesson-badge');
  if (badge) badge.textContent = '🏆';
}

function showToast(icon, title, sub) {
  var toast = document.getElementById('achievement-toast');
  var iconEl = document.getElementById('achievement-icon');
  var titleEl = document.getElementById('achievement-title');
  var subEl = document.getElementById('achievement-sub');
  if (!toast) return;
  if (iconEl) iconEl.textContent = icon;
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = sub;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function submitAssessment() {
  showToast('🎯', 'Assessment Submitted!', '+20 XP for completing');
  awardXP(20);
}

/* ── UPLOAD ── */
function triggerImageUpload(qi) {
  var input = document.getElementById(`upload-input-${qi}`);
  if (input) input.click();
}
function previewUpload(qi, inp) {
  if (!inp.files || !inp.files[0]) return;
  var preview = document.getElementById(`upload-preview-${qi}`);
  if (!preview) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    preview.innerHTML = `<img src="${e.target.result}" style="width:100%;border-radius:10px;margin-top:8px;" alt="Uploaded activity">`;
    showToast('📸', 'Photo Uploaded!', 'Great work!');
    awardXP(5);
  };
  reader.readAsDataURL(inp.files[0]);
}

/* ── AI CHAT (with real Anthropic API call) ── */
function openAiChat() { document.getElementById('ai-chat-modal').classList.add('active'); }
function closeAiChat() { document.getElementById('ai-chat-modal').classList.remove('active'); }

async function sendAiMessage(presetMsg) {
  var inp = document.getElementById('ai-custom-input');
  var stream = document.getElementById('ai-chat-stream');
  var sugArea = document.getElementById('ai-suggestions-area');
  if (!inp || !stream) return;

  var msg = presetMsg || inp.value.trim();
  if (!msg) return;

  /* Show user bubble */
  stream.innerHTML += `<div class="ai-bubble-user">${msg}</div>`;
  inp.value = '';
  if (sugArea) sugArea.style.display = 'none';

  /* Show typing indicator */
  var typingId = 'typing-' + Date.now();
  stream.innerHTML += `<div class="ai-typing" id="${typingId}"><span></span><span></span><span></span></div>`;
  stream.scrollTop = stream.scrollHeight;

  /* Build context from current activity */
  var act = state.activity;
  var context = act ? `You are a helpful bilingual (English + Marathi/Hindi) teaching assistant for an NCERT Kaushal Bodh vocational lesson called "${act.name}". The lesson is about: ${act.objectives.text}. Materials used: ${act.materials.join(', ')}. Answer in a friendly, short, classroom-appropriate way. Mix simple English and Marathi/Hindi phrases naturally.` : `You are a helpful bilingual teaching assistant for NCERT Kaushal Bodh Grade 6-8 vocational education. Answer helpfully and briefly.`;

  try {
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: context,
        messages: [{ role: 'user', content: msg }]
      })
    });
    var data = await response.json();
    var reply = data.content && data.content[0] ? data.content[0].text : 'Sorry, I could not fetch a response. Please try again!';

    var typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();
    stream.innerHTML += `<div class="ai-bubble-bot">${reply}</div>`;
  } catch (err) {
    var typingEl2 = document.getElementById(typingId);
    if (typingEl2) typingEl2.remove();
    /* Fallback responses when API unavailable */
    var fallbacks = {
      'salt': 'Salt kiti: Lemon Water maddhe fakt 1 chutki (pinch) meedh ghala. Jast nako! 🧂',
      'measurement': 'Measurement: 1 tablespoon = 3 teaspoons. Level kara, heap nako! 📏',
      'next': 'Pudhi activity: ' + (act ? act.name + ' - Activity Steps tab baghaa!' : 'Please select an activity first.'),
      'safety': 'Safety rules: 1) Haath dhuva 2) Apron ghala 3) Safe tools vapra 4) Spill lathkhan saaf kara 🛡️',
      'default': 'Namaste! Mi NCERT Kaushal Bodh saathi aahe. Tumhi recipe, measurement, ya safety baddal vichar karu shakat. 🙏'
    };
    var key = Object.keys(fallbacks).find(k => msg.toLowerCase().includes(k)) || 'default';
    stream.innerHTML += `<div class="ai-bubble-bot">${fallbacks[key]}</div>`;
  }

  stream.scrollTop = stream.scrollHeight;
}

/* ── VIDEO PLAYER SIMULATION ── */
function playIntroVideo(actId) {
  var bar = document.getElementById(`vid-progress-${actId}`);
  if (!bar) return;
  var pct = 0;
  showToast('▶️', 'Video Playing', 'Introduction guide starting...');
  var iv = setInterval(function() {
    pct += 2;
    bar.style.width = pct + '%';
    if (pct >= 100) { clearInterval(iv); showToast('✅', 'Video Complete!', '+5 XP'); awardXP(5); }
  }, 200);
}

/* ── DOWNLOAD ── */
function triggerDownload(type) {
  showToast('📥', type + ' Ready', 'Your ' + type + ' is being prepared...');
}
function triggerDownloadAsset(name, type) {
  showToast('📥', 'Downloading...', name);
}

/* ── FULLSCREEN ── */
function toggleFullscreen() {
  var frame = document.querySelector('.frame');
  if (!document.fullscreenElement) {
    (frame.requestFullscreen || frame.webkitRequestFullscreen || function(){}).call(frame);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen || function(){}).call(document);
  }
}

/* ── REFLECTION SAVE ── */
function saveReflection(actId, stepIdx, val) {
  /* Could persist to localStorage in extended version */
  if (val && val.length > 3) { awardXP(2); }
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Kaushal Saathi v2.0 Interactive Engine Ready 🚀');
});

/* ══════════════════════════════════════════════════════
   INTEGRATION: SIDEBAR NAV
   ══════════════════════════════════════════════════════ */
function openSidebar() {
  document.getElementById('sidebar-drawer').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('active');
}
function closeSidebar() {
  document.getElementById('sidebar-drawer').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

/* ══════════════════════════════════════════════════════
   INTEGRATION: ADVANCED OPTIONS
   ══════════════════════════════════════════════════════ */
function toggleResource(btn) {
  btn.classList.toggle('selected');
}

function addTool() {
  var input = document.getElementById('adv-tool-input');
  var val = input.value.trim();
  if (!val) return;
  var tags = document.getElementById('adv-tools-tags');
  var tag = document.createElement('span');
  tag.className = 'adv-tool-tag';
  tag.innerHTML = val + ' <i class="ti ti-x" style="font-size:10px;" onclick="this.parentElement.remove()"></i>';
  tags.appendChild(tag);
  input.value = '';
}

document.addEventListener('DOMContentLoaded', function() {
  var toolInput = document.getElementById('adv-tool-input');
  if (toolInput) {
    toolInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') addTool(); });
  }
});

function applyAdvancedOptions() {
  var period = document.getElementById('adv-period').value;
  var classSize = document.getElementById('adv-classsize').value;
  var state_val = document.getElementById('adv-state').value;
  var city = document.getElementById('adv-city').value;
  var subject = document.getElementById('adv-subject').value;
  var integrate = document.getElementById('adv-integrate').value;
  var internet = document.getElementById('adv-internet').checked;
  var challenge = document.getElementById('adv-challenge').value;

  /* Collect selected resources */
  var resources = [];
  document.querySelectorAll('#adv-resources .adv-resource-chip.selected').forEach(function(c) {
    resources.push(c.textContent.trim());
  });

  /* Collect tools */
  var tools = [];
  document.querySelectorAll('#adv-tools-tags .adv-tool-tag').forEach(function(t) {
    tools.push(t.textContent.replace('×','').trim());
  });

  /* Store in state */
  state.advancedOptions = {
    periodDuration: parseInt(period) || 35,
    classSize: classSize,
    state: state_val,
    city: city,
    resources: resources,
    tools: tools,
    internet: internet,
    subject: subject,
    subjectIntegration: integrate,
    teachingChallenge: challenge
  };

  showToast('⚙️', 'Options Applied', 'Plan updated with your classroom settings!');
  go('s-lesson');
}