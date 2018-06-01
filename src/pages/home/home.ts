import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var Stripe;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  stripe = Stripe('pk_test_GVS0FEXJnS4DrRivhwADsV8j');
  card: any;

  token=null;

  constructor(public navCtrl: NavController) {

  }
   
  ionViewDidLoad() {
    this.setupStripe();
  }

  setupStripe(){
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
      this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      //this.stripe.createSource(this.card)
      this.stripe.createToken(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
           this.token=result.token.id;
          console.log(result);
          this.card.clear();
        }
      });
    });

    
  }

}
