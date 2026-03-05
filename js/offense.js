//BLUE - Run   |||   PURPLE - Screen   |||    RED - Pass
//BLUE - L     |||   RED    - C        |||  BLACK - R
var Sweep28 = {
    id:"Sweep28",
    name:"28 Sweep",
    type:"Run",
    tag:"Game",
    desc:"The RB starts on the left, cuts across to the right for the handoff",
    plays: { 
play11:"C20,L15,L15", play12:"C7,L5,L4", play13:"C15,L17,L12", play14:"C-4,L-4,L-3", play15:"C9,L8,L7", play16:"C10,L8,L6", play17:"C8,L6,L4",
play21:"C11,L8,L6", play22:"C7,L5,L3", play23:"C6,L5,L4", play24:"C14,L12,L9", play25:"C28,L19f,L12", play26:"L-2,L-4,L-2", play27:"L40,L32,L20",
play31:"L16,L13,L10f", play32:"C14,L12,L10f", play33:"C10f,L8,L6", play34:"L82,L40,L32", play35:"L30,L22,L15", play36:"C33,L27,L20f", play37:"L91,L47,L2f",
play41:"L-3,L-1,L-2", play42:"L91,L30f,L20f", play43:"L8,L7,L5", play44:"L29,C0,L15f", play45:"L7,L6,L5", play46:"L28,L2f,L10", play47:"L2,L0,L-1",

play51:"L16,L13,L10f", play52:"C14,L12,L10f", play53:"C10f,L8,L6", play54:"L82,L40,L32", play55:"L30,L22,L15", play56:"C33,L27,L20f", play57:"L41,L47,L2f",

play61:"L16,L13,L10f", play62:"C14,L12,L10f", play63:"C10f,L8,L6", play64:"L82,L40,L32", play65:"L30,L22,L15", play66:"C33,L27,L20f", play67:"L91,L47,L2f",
play71:"L16,L13,L10f", play72:"C14,L12,L10f", play73:"C10f,L8,L6", play74:"L82,L40,L32", play75:"L30,L22,L15", play76:"C33,L27,L20f", play77:"L91,L47,L2f",
play81:"L16,L13,L10f", play82:"C14,L12,L10f", play83:"C10f,L8,L6", play84:"L82,L40,L32", play85:"L30,L22,L15", play86:"C33,L27,L20f", play87:"L11,L47,L2f",
play91:"L16,L13,L10f", play92:"C14,L12,L10f", play93:"C10f,L8,L6", play94:"L82,L40,L32", play95:"L30,L22,L15", play96:"C33,L27,L20f", play97:"L91,L47,L2f"}
};

var RunUITesting = {
    id:"RunUITesting",
    name:"Run UI Testing",
    type:"Test",
    tag:"Test",
    desc:"Test desc",
    plays: {
        play11:"L1,L1,L-1", play12:"C1,C1,C-1", play13:"R1f,R-1f,R1f", play14:"R-1,R1f,R1", play15:"L1f,L-1,L1f"}
};
var PassUITesting = {
    id:"PassUITesting",
    name:"Pass UI Testing",
    type:"Test",
    tag:"Test",
    desc:"Test desc",
    plays: {
        play11:"L0,C20,R-11", play12:"L20i,C15i,R15i", play13:"L20,C15,R15", play14:"L20i,C15,R15i", play15:"L20,C15i,R15"}
};
var TurnoverTesting = {
    id:"TurnoverTesting",
    name:"Turnover UI Testing",
    type:"Test",
    tag:"Test",
    desc:"Test desc",
    plays: {
        play11:"L0i,C20i,R-11i", play12:"L20i,C15i,R15i", play13:"L20f,C15f,R15f", play14:"L20i,C15i,R15i", play15:"L20f,C15f,R15f"}
};

var Punt = {
    id:"Punt",
    name:"Punt",
    type:"Kick",
    tag:"Game",
    desc:"Add a variation option to aim for a part of the field. L, R, C? Add a fake punt option, but it's a gamble.", 
    plays: { 
    play11:"L0,C50,R-11", play12:"L-20i,C15i,R-15i", play13:"L20f,C-15f,R15f", play14:"L-20i,C15f,R-15i", play15:"L20f,C-15i,R15f"}
};

var FieldGoal = {
    id:"FieldGoal",
    name:"Field Goal",
    type:"Kick",
    tag:"Game",
    desc:"Field goal attempt ** add a fake option that they can call, but the odds of it working are a gamble", 
    plays: { 
    play11:"L0,C50,R-11", play12:"L-20i,C15i,R-15i", play13:"L20f,C-15f,R15f", play14:"L-20i,C15f,R-15i", play15:"L20f,C-15i,R15f"}
};

var KickOff = {
    id:"KickOff",
    name:"Kick Off",
    type:"Kick",
    tag:"Game",
    desc:"Add a variation option to aim for a part of the field, L, R, C, endzone? so they just get the ball at the 25 yard line, ** add a onside kick option that they can call, but the odds of it working are a gamble", 
    plays: { 
    play11:"L0,C50,R-11", play12:"L-20i,C15i,R-15i", play13:"L20f,C-15f,R15f", play14:"L-20i,C15f,R-15i", play15:"L20f,C-15i,R15f"}
};



// ── FAKE PLAYS FOR TESTING ───────────────────────────────────────────────────
// IB Draw: a delayed handoff up the middle — decent short gains, occasional big
var IBDraw = {
    id:"IBDraw",
    name:"IB Draw",
    type:"Run",
    tag:"Game",
    desc:"QB fakes a pass then hands off to the FB diving through the middle",
    plays:{
play11:"C6,L5,R4",   play12:"C8,L6,R5",   play13:"C3,L2,R2",   play14:"C-2,L-1,R-2", play15:"C7,L6,R5",   play16:"C10,L8,R7",  play17:"C4,L3,R3",
play21:"C5,L4,R3",   play22:"C9,L7,R6",   play23:"C2,L1,R1",   play24:"C12,L10,R9",  play25:"C-1,L-2,R-1",play26:"C6,L5,R4",   play27:"C15,L12,R10",
play31:"C7,L6,R5",   play32:"C4,L3,R2",   play33:"C11,L9,R8",  play34:"C-3,L-2,R-3", play35:"C8,L7,R6",   play36:"C3,L2,R1",   play37:"C6,L5,R4",
play41:"C5,L4,R3",   play42:"C13,L11,R9", play43:"C2,L1,R0",   play44:"C7,L6,R5",    play45:"C-2,L-1,R-2",play46:"C9,L8,R7",   play47:"C4,L3,R3",
play51:"C6,L5,R4",   play52:"C3,L2,R1",   play53:"C10,L8,R7",  play54:"C-1,L0,R-1",  play55:"C7,L6,R5",   play56:"C5,L4,R3",   play57:"C12,L10,R8",
play61:"C4,L3,R2",   play62:"C8,L7,R6",   play63:"C-2,L-2,R-3",play64:"C6,L5,R4",    play65:"C11,L9,R8",  play66:"C3,L2,R1",   play67:"C7,L6,R5",
play71:"C9,L8,R7",   play72:"C2,L1,R0",   play73:"C6,L5,R4",   play74:"C-1,L-1,R-2", play75:"C8,L7,R6",   play76:"C4,L3,R2",   play77:"C14,L11,R9",
play81:"C5,L4,R3",   play82:"C7,L6,R5",   play83:"C3,L2,R1",   play84:"C10,L8,R7",   play85:"C-2,L-1,R-1",play86:"C6,L5,R4",   play87:"C2,L1,R0",
play91:"C8,L7,R6",   play92:"C4,L3,R2",   play93:"C11,L9,R8",  play94:"C-3,L-2,R-2", play95:"C6,L5,R4",   play96:"C3,L2,R1",   play97:"C9,L7,R6"}
};

// HB Off Tackle: outside run to the right — boom or bust, some big gains, some losses
var HBOffTackle = {
    id:"HBOffTackle",
    name:"HB Off Tackle",
    type:"Run",
    tag:"Game",
    desc:"HB takes the handoff and sweeps outside the right tackle looking for the edge",
    plays:{
play11:"R8,C6,L4",   play12:"R-2,C-1,L-2",play13:"R14,C11,L8", play14:"R3,C2,L1",    play15:"R-1,C0,L-1", play16:"R20,C15,L10",play17:"R5,C4,L3",
play21:"R7,C5,L4",   play22:"R-3,C-2,L-3",play23:"R11,C8,L6",  play24:"R2,C1,L0",    play25:"R18,C13,L9f",play26:"R-1,C-1,L-2",play27:"R6,C4,L3",
play31:"R9,C7,L5",   play32:"R-2,C-1,L-2",play33:"R4,C3,L2",   play34:"R22,C16,L12", play35:"R1,C0,L-1",  play36:"R-3,C-2,L-3",play37:"R13,C10,L7",
play41:"R6,C4,L3",   play42:"R-1,C0,L-1", play43:"R17,C12,L9", play44:"R-3,C-2,L-3", play45:"R8,C6,L4",   play46:"R2,C1,L0",   play47:"R-2,C-1,L-2",
play51:"R10,C8,L6",  play52:"R-4,C-3,L-4",play53:"R5,C3,L2",   play54:"R19,C14,L10", play55:"R1,C0,L-1",  play56:"R-2,C-1,L-2",play57:"R8,C6,L4",
play61:"R3,C2,L1",   play62:"R12,C9,L7",  play63:"R-2,C-1,L-2",play64:"R6,C5,L3",    play65:"R-3,C-2,L-3",play66:"R16,C11,L8", play67:"R2,C1,L0",
play71:"R8,C6,L4",   play72:"R-1,C0,L-1", play73:"R21,C15,L11",play74:"R4,C3,L2",    play75:"R-2,C-1,L-2",play76:"R9,C7,L5",   play77:"R-3,C-2,L-3",
play81:"R5,C4,L3",   play82:"R13,C10,L7", play83:"R-2,C-1,L-2",play84:"R7,C5,L4",    play85:"R-4,C-3,L-4",play86:"R18,C13,L10",play87:"R3,C2,L1",
play91:"R6,C4,L3",   play92:"R-1,C0,L-1", play93:"R10,C8,L6",  play94:"R-2,C-1,L-2", play95:"R24,C17,L12",play96:"R4,C3,L2",   play97:"R-3,C-2,L-3"}
};

// Short Curl: quick pass to the flats — reliable 5-8 yards, low turnover risk
var ShortCurl = {
    id:"ShortCurl",
    name:"Short Curl",
    type:"Pass",
    tag:"Game",
    desc:"QB throws a quick curl route to the WR in the flat — safe short yardage",
    plays:{
play11:"C8,L7,R6",   play12:"C5,L4,R3",   play13:"C0,L0,R0",   play14:"C10,L8,R7",   play15:"C6,L5,R4",   play16:"C3,L2,R2",   play17:"C7,L6,R5",
play21:"C4,L3,R2",   play22:"C9,L7,R6",   play23:"C0,L0,R0",   play24:"C6,L5,R4",    play25:"C12,L9,R8",  play26:"C2,L1,R1",   play27:"C5,L4,R3",
play31:"C7,L6,R5",   play32:"C0,L0,R0",   play33:"C4,L3,R2",   play34:"C10,L8,R7",   play35:"C6,L5,R4",   play36:"C8,L7,R6",   play37:"C3,L2,R2",
play41:"C5,L4,R3",   play42:"C0,L0,R0",   play43:"C9,L7,R6",   play44:"C6,L5,R4",    play45:"C2,L1,R1",   play46:"C11,L9,R8",  play47:"C4,L3,R2",
play51:"C7,L6,R5",   play52:"C3,L2,R2",   play53:"C0,L0,R0",   play54:"C8,L7,R6",    play55:"C5,L4,R3",   play56:"C10,L8,R7",  play57:"C2,L1,R1",
play61:"C6,L5,R4",   play62:"C9,L7,R6",   play63:"C4,L3,R2",   play64:"C0,L0,R0",    play65:"C7,L6,R5",   play66:"C3,L2,R2",   play67:"C11,L9,R8",
play71:"C5,L4,R3",   play72:"C8,L7,R6",   play73:"C2,L1,R1",   play74:"C10,L8,R7",   play75:"C0,L0,R0",   play76:"C6,L5,R4",   play77:"C4,L3,R2",
play81:"C9,L7,R6",   play82:"C3,L2,R2",   play83:"C7,L6,R5",   play84:"C0,L0,R0",    play85:"C5,L4,R3",   play86:"C12,L9,R8",  play87:"C2,L1,R1",
play91:"C6,L5,R4",   play92:"C10,L8,R7",  play93:"C4,L3,R2",   play94:"C8,L7,R6",    play95:"C0,L0,R0",   play96:"C3,L2,R2",   play97:"C7,L6,R5"}
};

// Deep Post: long pass down the middle — high reward, some INT risk (~10%)
var DeepPost = {
    id:"DeepPost",
    name:"Deep Post",
    type:"Pass",
    tag:"Game",
    desc:"QB throws deep to a WR running a post route — big play or turnover",
    plays:{
play11:"C25,L20,R15",  play12:"C0i,L0i,R0i", play13:"C30,L22,R18",  play14:"C16,L12,R9",  play15:"C18,L14,R12",  play16:"C22,L17,R13", play17:"C35,L27,R20",
play21:"C14,L10,R8",   play22:"C22,L17,R13", play23:"C0i,L0i,R0i",  play24:"C28,L21,R16", play25:"C12,L9,R7",    play26:"C20,L15,R11", play27:"C15,L11,R8",
play31:"C32,L24,R19",  play32:"C0i,L0i,R0i", play33:"C18,L13,R10",  play34:"C20,L15,R11", play35:"C25,L19,R14",  play36:"C13,L10,R7",  play37:"C40,L30,R22",
play41:"C17,L13,R9",   play42:"C27,L20,R15", play43:"C0i,L0i,R0i",  play44:"C35,L26,R19", play45:"C14,L10,R8",   play46:"C20,L15,R11", play47:"C19,L14,R10",
play51:"C22,L17,R13",  play52:"C0i,L0i,R0i", play53:"C30,L23,R17",  play54:"C16,L12,R9",  play55:"C15,L11,R8",   play56:"C21,L16,R12", play57:"C38,L29,R21",
play61:"C13,L9,R7",    play62:"C24,L18,R14", play63:"C0i,L0i,R0i",  play64:"C31,L23,R17", play65:"C15,L11,R8",   play66:"C19,L14,R10", play67:"C17,L13,R9",
play71:"C28,L21,R15",  play72:"C0i,L0i,R0i", play73:"C36,L27,R20",  play74:"C14,L10,R7",  play75:"C21,L16,R12",  play76:"C16,L12,R8",  play77:"C45,L33,R24",
play81:"C18,L14,R10",  play82:"C26,L19,R14", play83:"C0i,L0i,R0i",  play84:"C33,L25,R18", play85:"C15,L11,R8",   play86:"C18,L13,R9",  play87:"C20,L15,R11",
play91:"C30,L22,R16",  play92:"C0i,L0i,R0i", play93:"C23,L17,R12",  play94:"C16,L12,R9",  play95:"C40,L30,R22",  play96:"C14,L10,R7",  play97:"C17,L12,R8"}
};

// WR Screen: screen pass to the wide side — surprise big gains but risky in man coverage
var WRScreen = {
    id:"WRScreen",
    name:"WR Screen",
    type:"Screen",
    tag:"Game",
    desc:"Quick toss to a WR with blockers set up — can spring a big gain",
    plays:{
play11:"R12,C9,L7",   play12:"R-3,C-2,L-3",play13:"R20,C15,L11", play14:"R6,C4,L3",    play15:"R-2,C-1,L-2",play16:"R8,C6,L4",   play17:"R-4,C-3,L-4",
play21:"R15,C11,L8",  play22:"R3,C2,L1",   play23:"R-2,C-1,L-2",play24:"R10,C8,L6",   play25:"R-4,C-3,L-4",play26:"R18,C13,L9", play27:"R5,C3,L2",
play31:"R-3,C-2,L-3", play32:"R22,C16,L12",play33:"R7,C5,L3",   play34:"R-1,C0,L-1",  play35:"R12,C9,L7",  play36:"R-4,C-3,L-4",play37:"R9,C7,L5",
play41:"R16,C12,L9",  play42:"R-2,C-1,L-2",play43:"R6,C4,L2",   play44:"R-3,C-2,L-3", play45:"R25,C18,L13",play46:"R4,C3,L2",   play47:"R-2,C-1,L-2",
play51:"R8,C6,L4",    play52:"R-4,C-3,L-4",play53:"R14,C10,L7", play54:"R2,C1,L0",     play55:"R-3,C-2,L-3",play56:"R20,C14,L10",play57:"R6,C4,L3",
play61:"R-2,C-1,L-2", play62:"R11,C8,L6",  play63:"R-4,C-3,L-4",play64:"R17,C12,L9",  play65:"R5,C3,L2",   play66:"R-1,C0,L-1", play67:"R13,C10,L7",
play71:"R9,C7,L5",    play72:"R-3,C-2,L-3",play73:"R23,C17,L12",play74:"R3,C2,L1",     play75:"R-2,C-1,L-2",play76:"R7,C5,L3",   play77:"R-4,C-3,L-4",
play81:"R14,C10,L7",  play82:"R-1,C0,L-1", play83:"R8,C6,L4",   play84:"R-3,C-2,L-3", play85:"R19,C14,L10",play86:"R4,C3,L2",   play87:"R-2,C-1,L-2",
play91:"R-4,C-3,L-4", play92:"R12,C9,L6",  play93:"R2,C1,L0",   play94:"R-2,C-1,L-2", play95:"R8,C6,L4",   play96:"R-3,C-2,L-3",play97:"R16,C11,L8"}
};
// ─────────────────────────────────────────────────────────────────────────────

var offense = [Sweep28,IBDraw,HBOffTackle,ShortCurl,DeepPost,WRScreen,RunUITesting,PassUITesting,TurnoverTesting,Punt,FieldGoal,KickOff];