var VotingGame = (function (VG) {
  "use strict";

  // Details for all the different upgrades (assigned to VG so we could play
  // with them in tests)
  VG._upgradesDetails = VG._upgradesDetailsDefault = [
    {
      id: "Clicker1",
      name: "שתי ציפורים במכה אחת",
      price: 50,
      description: "כל הקלקה מביאה שני קולות.",
      func: function(game) {
        game.clickValue++;
      },
    },
	{
      id: "Clicker2",
      name: "אצבע משולשת",
      price: 100,
      description: "כל הקלקה מביאה שלוש קולות.",
      func: function(game) {
        game.clickValue++;
      },
    },
	{
      id: "Clicker3",
      name: "מספיק למניין",
      price: 500,
      description: "כל הקלקה מביאה 10 קולות.",
      func: function(game) {
        game.clickValue=10;
      },
    },
	{
      id: "Clicker4",
      name: "פי 1000 עוצמה לישראל",
      price: 10000,
      description: "כל הקלקה מביאה 1000 קולות.",
      func: function(game) {
        game.clickValue=1000;
      },
    },
	//=====LONE VOTER UPGRADES=====
	{
      id: "Voter1",
      name: "הבטחות כוזבות",
      price: 60,
      description: "גורמות למצביעים שלך להצביע כל 2.5 שניות",
      func: function(game) {
        var voterGen = game.getGenById("Voter");
        voterGen.updateVotesPerSecond(0.4);
      },
    },
	{
      id: "Voter2",
      name: "נאום מרגש",
      price: 240,
      description: "הנאום שכתבת גורם למצביעים בודדים להזדרז ולהצביע כל שנייה.",
      func: function(game) {
        var voterGen = game.getGenById("Voter");
        voterGen.updateVotesPerSecond(1);
      },
    },
	{
      id: "Voter3",
      name: "העלאת הארנונה",
      price: 2010,
      description: "יותר כסף לבזבז על שוחד. 50% הנחה על מצביעים בודדים.",
      func: function(game) {
        var voterGen = game.getGenById("Voter");
        voterGen.updatePrice("/2");
      },
    },
	{
      id: "Voter4",
      name: "העלאת מיסים",
      price: 5050,
      description: "שנה הבאה לא נעלה. מבטיחים. 90% הנחה על מצביעים בודדים.",
      func: function(game) {
        var voterGen = game.getGenById("Voter");
        voterGen.updatePrice("/10");
      },
    },
	{
      id: "Voter5",
      name: "מעבר לשעון חורף",
      price: 50500,
      description: "מצביעים בודדים מצביעים פי 3 יותר מהר.",
      func: function(game) {
        var voterGen = game.getGenById("Voter");
        voterGen.updateVotesPerSecond("*3");
      },
    },
	{
      id: "Voter6",
      name: "העלאת מיסים",
      price: 105000,
      description: "לא אמרנו שום דבר כזה. שקרן. 90% הנחה על מצביעים בודדים.",
      func: function(game) {
        var voterGen = game.getGenById("Voter");
        voterGen.updatePrice("/10");
      },
    },
	//=====COOKIES UPGRADES=====
	{
	  id: "Cookie1",
      name: "עוגיות חשיש",
      price: 420,
      description: "קהלים אחרים מביאים פי 2 קולות מעוגיות.",
      func: function(game) {
        var voterGen = game.getGenById("Cookie");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Cookie2",
      name: "שוקולד בלגי",
      price: 1000,
      description: "העוגיות טעימות פי 2, והן מעניקות לך פי 2 קולות.",
      func: function(game) {
        var voterGen = game.getGenById("Cookie");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Cookie3",
      name: "תחליף סוכר",
      price: 5000,
      description: "זול, טעים ורק 7% סיכוי לסרטן. הנחה של 90% בקניית עוגיות.",
      func: function(game) {
        var voterGen = game.getGenById("Cookie");
        voterGen.updatePrice("/10");
      },
    },
	{
	  id: "Cookie4",
      name: "מילקשייק",
      price: 25000,
      description: "הוא מביא את כל הבנים לחצר ופי 2 קולות מעוגיות.",
      func: function(game) {
        var voterGen = game.getGenById("Cookie");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Cookie5",
      name: "עוגיות חמאה",
      price: 130000,
      description: "חוסכים בשוקולד. 50% הנחה על עוגיות.",
      func: function(game) {
        var voterGen = game.getGenById("Cookie");
        voterGen.updatePrice("/2");
      },
    },
	{
	  id: "Cookie6",
      name: "עוגיות כשרות לפסח",
      price: 1300000,
      description: "מדם כשר של גויים. פי 5 קולות מעוגיות.",
      func: function(game) {
        var voterGen = game.getGenById("Cookie");
        voterGen.updateVotesPerSecond("*5");
      },
    },
	{
	  id: "Cookie7",
      name: "עוגיות כריסטמס",
      price: 13000000,
      description: "גם לנוצרים יש זכות הצבעה. 1.98% יותר קולות מעוגיות.",
      func: function(game) {
        var voterGen = game.getGenById("Cookie");
        voterGen.updateVotesPerSecond("*1.02");
      },
    },
	{
	  id: "Cookie8",
      name: "עוגיות טחינה",
      price: 130000000,
      description: "עלה תאנה בעולם האפייה. פי 2 קולות מעוגיות.",
      func: function(game) {
        var voterGen = game.getGenById("Cookie");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Cookie9",
      name: "עוגיות מקרון",
      price: 1300000000,
      description: "אליטיסטים והיפסטרים אוהבים אותך. פי 2 קולות מעוגיות.",
      func: function(game) {
        var voterGen = game.getGenById("Cookie");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	//=====CAMPAIGN UPGRADES=====
	{
	  id: "Campaign1",
      name: "כותב נאומים",
      price: 700,
      description: "תכבוש אותם עם המילים שלך (עדיין לא עושה כלום).",
      func: function(game) {
        var voterGen = game.getGenById("Campaign");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Campaign2",
      name: "ג'ינגל ממכר",
      price: 2600,
      description: "If you wanna be my leader... פי 2 קולות מקמפיינים.",
      func: function(game) {
        var voterGen = game.getGenById("Campaign");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Campaign3",
      name: "פוסטרים",
      price: 12500,
      description: "פרצופך על כל שלט בארץ. חוץ מירושלים. קצת צניעות. פי 2 קולות מקמפיינים.",
      func: function(game) {
        var voterGen = game.getGenById("Campaign");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Campaign4",
      name: "סטטוס מצייץ",
      price: 72500,
      description: "אה, חשבתם שמישהו 'סתם' משתף את זה? פי 10 קולות מקמפיינים.",
      func: function(game) {
        var voterGen = game.getGenById("Campaign");
        voterGen.updateVotesPerSecond("*10");
      },
    },
	{
	  id: "Campaign5",
      name: "סרטון וויראלי",
      price: 725000,
      description: "דמיין חתול נושך את האצבע של זמר קוריאני. פי 2 קולות מקמפיינים.",
      func: function(game) {
        var voterGen = game.getGenById("Campaign");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Campaign6",
      name: "תשדיר ספינאוף",
      price: 7250000,
      description: "ישווק כספינאוף של בית הקלפים. פי 2 קולות מקמפיינים.",
      func: function(game) {
        var voterGen = game.getGenById("Campaign");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Campaign7",
      name: "עיתון משלך",
      price: 72500000,
      description: "זה חוקי כל עוד הוא לא מצליח. פי 9.99 קולות מקמפיינים.",
      func: function(game) {
        var voterGen = game.getGenById("Campaign");
        voterGen.updateVotesPerSecond("*10");
      },
    },
	{
	  id: "Campaign8",
      name: "פרופגנדה",
      price: 725000000,
      description: "הכלי החביב על גבלס בשירותך. פי 10 קולות מקמפיינים.",
      func: function(game) {
        var voterGen = game.getGenById("Campaign");
        voterGen.updateVotesPerSecond("*10");
      },
    },
	//=====RABI UPGRADES=====
	{
	  id: "Rabi1",
      name: "קריאת שופר",
      price: 54000,
      description: "קוראת לבני מינו (זה פוגעני? מקווה שלא). פי 2 קולות מרביז.",
      func: function(game) {
        var voterGen = game.getGenById("Rabi");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Rabi2",
      name: "מכונות גילוח",
      price: 405000,
      description: "הופכות את הזקן של רביז לזקן היפסטרים סקסי שמניב פי 5 קולות.",
      func: function(game) {
        var voterGen = game.getGenById("Rabi");
        voterGen.updateVotesPerSecond("*5");
      },
    },
	{
	  id: "Rabi3",
      name: "אנטישמיות!",
      price: 4000000,
      description: "כולם אנטישמים בגולה. תבוא לארץ. תלמדו תורה. תצביעו לי. 50% הנחה על רביז.",
      func: function(game) {
        var voterGen = game.getGenById("Rabi");
        voterGen.updatePrice("/2");
      },
    },
	{
	  id: "Rabi4",
      name: "סגירת מרכולים בשבת",
      price: 41000000,
      description: "אם אנחנו לא יכולים ליהנות. אף אחד לא יכול. פי 2 קולות מרביז.",
      func: function(game) {
        var voterGen = game.getGenById("Rabi");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Rabi5",
      name: "גיוס בני ישיבות*",
      price: 405000000,
      description: "*לחמש דקות במתן הטבות ל-10 שנים פלוס רכב חברה. פי 2 קולות מרביז.",
      func: function(game) {
        var voterGen = game.getGenById("Rabi");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Rabi6",
      name: "ניתוח המוני לשינוי מין",
      price: 4050000000,
      description: "נשים לא יכולות להיות רביז. פי 2 קולות מטרנס-רביז.",
      func: function(game) {
        var voterGen = game.getGenById("Rabi");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Rabi7",
      name: "רובו רייבה",
      price: 40500000000,
      description: "ויהפנט אותם, באותות ובמופתים, להצביע לך. פי 10 קולות ממגה-רביז.",
      func: function(game) {
        var voterGen = game.getGenById("Rabi");
        voterGen.updateVotesPerSecond("*10");
      },
    },
	//=====GAYS UPGRADES=====
	{
	  id: "Gays1",
      name: "מצעד גאווה",
      price: 825000,
      description: "מעורר מודעות... לגופים הלוהטים שלנו! פי 2 קולות מתאים גאים!",
      func: function(game) {
        var voterGen = game.getGenById("Gays");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Gays2",
      name: "ג. ג. אוחובסקי ובניו",
      price: 8000000,
      description: "מנקי ארונות מאז 1992! 50% הנחה על תאים גאים.",
      func: function(game) {
        var voterGen = game.getGenById("Gays");
        voterGen.updatePrice("/2");
      },
    },
	{
	  id: "Gays3",
      name: "פתיחת הכניסה האחורית",
      price: 80000000,
      description: "הידעת? עד 1988 היה איסור בחוק על מין אנאלי. פי 5 קולות מתאים גאים.",
      func: function(game) {
        var voterGen = game.getGenById("Gays");
        voterGen.updateVotesPerSecond("*5");
      },
    },
	{
	  id: "Gays4",
      name: "חוק נישואים גאים*",
      price: 800000000,
      description: "*לא כולל תרומות דם, פונדקאות, או שוויון זכויות. 50% הנחה.",
      func: function(game) {
        var voterGen = game.getGenById("Gays");
        voterGen.updatePrice("/2");
      },
    },
	{
	  id: "Gays5",
      name: "הומודלת",
      price: 8000000000,
      description: "יום חג נוסף מוביל תנופה כלכלית ופי 2 קולות מתאים גאים.",
      func: function(game) {
        var voterGen = game.getGenById("Gays");
        voterGen.updateVotesPerSecond("*2");
      },
    },
	{
	  id: "Gays6",
      name: "כיבוש אורנוס",
      price: 80000000000,
      description: "באנגלית זה יותר מצחיק. פי 10 קולות מתאים גאים.",
      func: function(game) {
        var voterGen = game.getGenById("Gays");
        voterGen.updateVotesPerSecond("*10");
      },
    },
  ];

  return VG;
})(VotingGame || {});
