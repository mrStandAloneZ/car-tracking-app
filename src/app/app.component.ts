import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

import cars from '../assets/cars/cars.json';

import { styles } from './mayp.styles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'google-maps';

  private map: google.maps.Map;

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyCT6y3JqHCVO4xJjs5RHUWHTH-1040xZrc',
    });

    loader.load().then(() => {
      console.log('loaded gmaps');
      console.log(cars);

      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: cars[0]['coordinates'],
          zoom: 13,
          styles: styles,
        }
      );

      const truck = {
        url: '/assets/svg/truck.svg', // url
        scaledSize: new google.maps.Size(120, 120), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0), // anchor
        labelOrigin: new google.maps.Point(70, 59),
      };

      let marker, i;

      for (i = 0; i < cars.length; i++) {
        marker = new google.maps.Marker({
          position: cars[i]['coordinates'],
          map: map,
          label: cars[i]['licensePlate'],
          icon: truck,
        });

        const contentString = `     
                    <div class="car-info" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img class="car-img" src=${cars[i]['carImage']} class="img-fluid rounded-start" alt="..."/>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <p class="driver-detail"> <img src=${cars[i]['driverImg']}/> <span>${cars[i]['driverName']}</span> </p>
                    <p class="car-detail">รุ่นรถ: ${cars[i]['brand']} /  ${cars[i]['model']}</p>
                    <p class="car-detail">ทะเบียนรถ: ${cars[i]['licensePlate']}</p>
                    <p class="card-text">รายละเอียดงาน:${cars[i]['jobDesc']}</p>
                  </div>
                </div>
              </div>
            </div>
         `;

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        google.maps.event.addListener(
          marker,
          'click',
          (function (marker, i) {
            return function () {
              infowindow.open(map, marker);
            };
          })(marker, i)
        );
      }
    });
  }
}
