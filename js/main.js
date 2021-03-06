var demos = [ 
    'basic','circle','building','office','crossing','crossroads', 'remove'
];

demos.sort();

var demoName = 'basic';

var isWithCode = false;
var view;
var tell = editor.tell;

function init () {

    view = new View();
    intro.init('Crowd: Samuel Girardin | Lab: 3th');
    view.camera.fov = 50;
    view.initGeometry();
    //view.initMaterial();
    view.initGrid();
    view.addShadow();
    view.addTone();
    
    crowd.init( load, 2000 );

}

function load () {

	view.load( ['./assets/models/heros.sea', './assets/textures/heros_c.jpg', './assets/textures/spherical/ceramic.jpg' ], next );

}

function next ( p ) {

    view.mat['agent'] = new THREE.MeshBasicMaterial({ color:0x7caccc, wireframe:true });
    view.mat['agentHide'] = new THREE.MeshBasicMaterial({ color:0x7caccc, wireframe:true, transparent:true, opacity:0.1 });
    view.mat['heros'] = new THREE.MeshLambertMaterial({ color:0xffffff, skinning:true, shadowSide:false, reflectivity:0.4 });
    view.mat['way'] = new THREE.MeshBasicMaterial({ color:0xFF8800, wireframe:true });
    view.mat['wall'] = new THREE.MeshLambertMaterial({ color:0x0088ff, transparent:true, opacity:0.3, shadowSide:false });

	var t = new THREE.Texture( p['heros_c'] );
	t.flipY = false;
	t.needsUpdate = true;

    var t2 = new THREE.Texture( p['ceramic'] );
    t2.mapping = THREE.SphericalReflectionMapping;
    t2.needsUpdate = true;


    
    view.mat.heros.map = t;
    view.mat.heros.envMap = t2;

	view.mesh = pool.meshByName ( 'heros' );

    console.log(view.mesh)
    
    editor.init( launch, isWithCode, '#9966FF', 'Crowd.lab' );

    intro.clear();

    //crowd.start();

    ready();
    
}

function unPause () {

    crowd.start();

}

function ready () {

    var hash = location.hash.substr( 1 );
    if(hash !=='') demoName = hash;
    editor.load('demos/' + demoName + '.js');

};

function launch ( name ) {

    var full = true;
    var hash = location.hash.substr( 1 );
    if( hash === name ) full = false;

    location.hash = name;

    crowd.reset( full );
    
    demo = new window['demo'];

};

// editor fonction

function cam ( o ) { view.moveCam( o ); };
function follow ( name ) { view.setFollow( name ); };

function agent ( o ) { view.agent( o ); };

function obstacle ( o ) { view.obstacle( o ); };
function way ( o ) { view.way( o ); };
function goal ( o ) { crowd.send( 'goal', o ); };
function precision ( o ) { crowd.send( 'precision', o ); };
function set ( o ) { crowd.send( 'set', o ); };
function up ( o ) { crowd.send( 'up', o ); };

function hideGrid () { view.hideGrid(); };
//function load ( name, callback ) { view.load( name, callback  ); };
