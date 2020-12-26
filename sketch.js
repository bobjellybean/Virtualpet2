var dog, database, happydog, foodstock, foodS, dog1, happydog1
var addFood, feedFood
var foodObj
var fedTime, lastFed

function preload()
{
  dog = loadImage("images/Dog.png");
  happydog = loadImages("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  foodObj = new Food();

  dog1 = createSprite(100,100);
  dog1 = addImage(dog);

  happydog1 = createSprite(200,200);
  happydog1 = addImage(happydog);

  foodstock = database.ref('Food');
  foodstock.on("value,readstock");

  feedFood = createButton("Feed the dog");
  feedFood.position(30,30);
  feedFood.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(30,50);
  addFood.mousePressed(addFoods);

}


function draw() {  
background(46,187,87);

foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

fill(255,255,254);
textSize(15);

if(lastfed>=12){
  text("Last Feed : "+lastFed%12+ "PM", 350,30);
} else if (lastFed==0) {
  text("Last Feed : 12 AM", 350,30);
} else {
  text("Last Feed : "+lastFed+ "AM", 350,30)
}

  drawSprites();
}

function readStock (data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog (){
  dog.addImage(happyDog1);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  }

function addFoods(){
  foodS++;
  database.ref('/').update ({
    Food : foodS
})
}
