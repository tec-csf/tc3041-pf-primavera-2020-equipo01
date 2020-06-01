import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';  
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {
  //title = "angularx-qrcode-sample-app";
  // QR Gen
  public qrdata: string = null;
  public elementType: "img";
  public scale: number = 1;
// QR Reader
  public imagePath; 
  value : any;  
  @ViewChild('result', {static: false}) resultElement: ElementRef;  
  showQRCode: boolean = false;  

  loading = true;
  json:String;
  resultMessage:String;
  qrdataLong:String;
  qrNum: number;

  constructor(private renderer: Renderer2, private http: HttpClient) {
    this.qrdata = "http://35.223.162.94/cases/edit/" + "0";
    this.elementType = "img";
    this.scale = 4;
  }

  ngOnInit() {
  }

  preview(files) {  // QR Reader
    if (files.length === 0)  
      return;  
    var mimeType = files[0].type;  
    if (mimeType.match(/image\/*/) == null) {  
      console.log("Only images are supported.");
      alert("Only images are supported.");  
      return;  
    }  
    var reader = new FileReader();  
    reader.readAsDataURL(files[0]);  
    reader.onload = (_event) => {  
      this.value = reader.result;  
      console.log(reader.result);  
      this.showQRCode = true;  
    }
  }  

  render(e) {  // QR Reader
    let element: Element = this.renderer.createElement('h1');  
    element.innerHTML = e.result; 
    this.qrNum = e.result;
    console.log(e.result); // qr result
    this.renderElement(element);  
  }  

  renderElement(element) {  // QR Reader
    for (let node of this.resultElement.nativeElement.childNodes) {  
      this.renderer.removeChild(this.resultElement.nativeElement, node);  
    }  
    this.renderer.appendChild(this.resultElement.nativeElement, element);  
  }  

  changeValue(newValue: string): void {// QR Gen
    this.qrdata = "http://35.223.162.94/cases/edit/" + newValue;
  }
}
