"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var angularfire2_1 = require("angularfire2");
var AboutPage = (function () {
    function AboutPage(navCtrl, alertCtrl, af) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.coffees = af.database.list('/coffee');
    }
    AboutPage.prototype.getCoffee = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Coffee Name',
            message: "Enter a name for this coffee",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.coffees.push({
                            name: data.name
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    return AboutPage;
}());
AboutPage = __decorate([
    core_1.Component({
        selector: 'page-about',
        templateUrl: 'about.html'
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, ionic_angular_1.AlertController,
        angularfire2_1.AngularFire])
], AboutPage);
exports.AboutPage = AboutPage;
