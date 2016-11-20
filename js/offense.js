//BLUE - Run   |||   PURPLE - Screen   |||    RED - Pass
//BLUE - L     |||   RED    - C        |||  BLACK - R
var Sweep28 = {
    id:"Sweep28",
    name:"28 Sweep",
    type:"Run", 
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
    desc:"Test desc",
    plays: {
        play11:"L1,L1,L-1", play12:"C1,C1,C-1", play13:"R1f,R-1f,R1f", play14:"R-1,R1f,R1", play15:"L1f,L-1,L1f"}
};
var PassUITesting = {
    id:"PassUITesting",
    name:"Pass UI Testing",
    type:"Test",
    desc:"Test desc",
    plays: {
        play11:"L0,C50,R-11", play12:"L-20i,C15i,R-15i", play13:"L20,C-15,R15", play14:"L-20i,C15,R-15i", play15:"L20,C-15i,R15"}
};

var Punt = {
    id:"Punt",
    name:"Punt",
    type:"Kick", 
    desc:"Add a variation option to aim for a part of the field. L, R, C? Add a fake punt option, but it's a gamble.", 
    plays: { 
    play11:"L0,C50,R-11", play12:"L-20i,C15i,R-15i", play13:"L20f,C-15f,R15f", play14:"L-20i,C15f,R-15i", play15:"L20f,C-15i,R15f"}
};

var FieldGoal = {
    id:"FieldGoal",
    name:"Field Goal",
    type:"Kick", 
    desc:"Field goal attempt ** add a fake option that they can call, but the odds of it working are a gamble", 
    plays: { 
    play11:"L0,C50,R-11", play12:"L-20i,C15i,R-15i", play13:"L20f,C-15f,R15f", play14:"L-20i,C15f,R-15i", play15:"L20f,C-15i,R15f"}
};

var KickOff = {
    id:"KickOff",
    name:"Kick Off",
    type:"Kick", 
    desc:"Add a variation option to aim for a part of the field, L, R, C, endzone? so they just get the ball at the 25 yard line, ** add a onside kick option that they can call, but the odds of it working are a gamble", 
    plays: { 
    play11:"L0,C50,R-11", play12:"L-20i,C15i,R-15i", play13:"L20f,C-15f,R15f", play14:"L-20i,C15f,R-15i", play15:"L20f,C-15i,R15f"}
};



var offense = [Sweep28,RunUITesting,PassUITesting,Punt,FieldGoal,KickOff];