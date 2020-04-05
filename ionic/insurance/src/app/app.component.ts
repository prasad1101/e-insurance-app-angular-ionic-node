import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ModalController, Item, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuService } from '../services/menu-service';
import { AppSettings } from '../services/app-settings';
import { IService } from '../services/IService';
import { HomePage } from '../pages/home/home';

import { ItemDetailsPageLogin } from '../pages/item-details-login/item-details-login';



@Component({
  templateUrl: 'app.html',
  providers: [MenuService]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  title: string;
  isBuyButtonEnabled = false;
  componentName: string;
  pages: any = {};
  listServices: { [key: string]: IService; } = {};
  service: IService;


  rootPage = "HomePage";

  params: any;
  leftMenuTitle: string;

  constructor(
    private alertCtrl: AlertController,
    public platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu: MenuController,
    private menuService: MenuService,
    public modalCtrl: ModalController) {
    this.initializeApp();
    this.pages = menuService.getAllThemes();
    this.leftMenuTitle = menuService.getTitle();
    this.menuService.load(null).subscribe(snapshot => {
      this.params = snapshot;
      if (AppSettings.SHOW_START_WIZARD) {
        this.presentProfileModal();
      }
    });

  }


  presentProfileModal() {
    const profileModal = this.modalCtrl.create("IntroPage");
    profileModal.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.splashScreen.hide();
      localStorage.setItem("mailChimpLocal", "true");
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    // navigate to the new page if it is not the current page
    if (page.singlePage) {
      this.menu.open();
      this.nav.push(this.getPageForOpen(page.theme), {
        service: this.getServiceForPage(page.theme),
        page: page,
        componentName: page.theme
      });
    } else {
      this.nav.setRoot("ItemsPage", {
        componentName: page.theme
      });
    }
  }

  getPageForOpen(value: string): any {
    return null;
  }

  getServiceForPage(value: string): IService {
    return null;
  }



}
