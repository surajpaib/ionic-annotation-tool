import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import 'fabric'

declare let fabric: any;

@Component({
selector: 'page-image',
templateUrl: 'image.html'
})
export class ImagePage {
public canvas;
public shape;
public image;
public posX;
public posY;
public obj;
public width = 50;
public height = 50;
public conflict = false;

constructor(public navCtrl: NavController, public params: NavParams) {
  this.image = params.get('image');
}





ionViewWillEnter(){
this.canvas = new fabric.Canvas('c');
this.canvas.setBackgroundImage(this.image, this.canvas.renderAll.bind(this.canvas), {
            height: this.canvas.height,
            width: this.canvas.width,
            originX: 0,
            originY: 0,
            scaleX: 0.75,
            scaleY: 0.76
        });





this.canvas.on({'touch:drag': () => {
  this.conflict = true;
}});


this.canvas.on({
  'mouse:down': (event) => {
  this.conflict = false;
  let pointer = this.canvas.getPointer(event.e);
  this.posX = pointer.x;
  this.posY = pointer.y;
  this.shape = new fabric.Rect({
  width: this.width,
  height: this.height,
  left: this.posX - Math.floor(this.width/2),
  top:this.posY - Math.floor(this.height/2),
  stroke: '#458A81',

  fill:'transparent'
});
  

this.obj = this.canvas.getObjects();

if (this.obj.length != 0){
  for (let objects of this.obj){
      console.log('posX:' + this.posX);
      console.log('posY:' + this.posY);
      console.log('tl.x' + objects.aCoords.tl.x);
      console.log('tl.y' + objects.aCoords.tl.y);
      console.log('br.x' + objects.aCoords.br.x);
      console.log('br.y' + objects.aCoords.br.y);


      if (this.posX > objects.aCoords.tl.x - 5 && this.posX < objects.aCoords.br.x + 5 && this.posY > objects.aCoords.tl.y - 5 && this.posY < objects.aCoords.br.y + 5 ){
        
        console.log("Conflicting Objects");
        this.conflict = true;
        this.width = objects.aCoords.br.x - objects.aCoords.tl.x;
        this.height = objects.aCoords.br.y - objects.aCoords.tl.y;

      }
    }
}

if (!this.conflict){
  this.canvas.add(this.shape);
}

}
}

);
}

Submit(){
if (this.canvas.getObjects() != []){
  console.log(this.canvas.getObjects());
}
}


Delete(){
  this.canvas.remove(this.canvas.getActiveObject());

}



} 