import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SocketWebService } from '../../services/socket-web.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements AfterViewInit, OnInit {
  @ViewChild('canvasRef', {static: false}) canvasRef: any; //Hace referencia al elemento html

  width = 600;
  height = 400;

  private cx!: CanvasRenderingContext2D;
  private points: Array<any> = [];
  
  isAvailable: boolean = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove = (e: any) => {
    if(e.target.id === 'canvasId' && this.isAvailable){
      this.write(e);  
    }
  }

  @HostListener('click', ['$event'])
  onClick = (e: any) => {
    if(e.target.id === 'canvasId'){
      this.isAvailable = !this.isAvailable; 
    }
  }

  constructor(private socketWebService: SocketWebService){
    
  }

  ngOnInit(): void {
    this.socketWebService.sendDraw.subscribe(res => {
      const  { prevPos } = res;
      this.writeSingle(prevPos, false)
    })

    this.socketWebService.deleteDraw.subscribe(() => {
      this.clearDraw();
    });
  }

  ngAfterViewInit(): void {
    this.render()
  }

  private render(): void {
    const canvasEl = this.canvasRef.nativeElement;
    this.cx = canvasEl.getContext('2d');
    
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 4;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#fff';
  }

  private write(res: any): void{
    const canvasEl = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect(); // get dimensions of div, value: px

    const prevPos = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top
    } //coordenadas solo del canvas y no del resto del html

    this.writeSingle(prevPos);
  }

  private writeSingle(position: any, emit = true): void{
    this.points.push(position);
    if(this.points.length > 3){
      const prevPos = this.points[this.points.length-1];
      const currentPos = this.points[this.points.length-2];

      this.drawOnCanvas(prevPos, currentPos);

     if(emit) this.socketWebService.emitEvent({prevPos});
    }
  }

  private drawOnCanvas(prevPos: any, currentPos: any): void{
    if(!this.cx){
      return; 
    }

    this.cx.beginPath(); //iniciar

    if(prevPos){
      this.cx.moveTo(prevPos.x, prevPos.y); // desde
      this.cx.lineTo(currentPos.x, currentPos.y); //hasta
      this.cx.stroke(); //Dibuja
    }
  }

  onClearZone(): void {
    this.clearDraw();
    this.socketWebService.emitEventDeleteDraw();
  }

  clearDraw(){
    this.points = [];
    this.cx.clearRect(0, 0, this.width, this.height);
  }
}
