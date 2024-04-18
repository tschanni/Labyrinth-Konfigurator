import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { UnityGameComponent } from './components/unity-game/unity-game.component';
import { ButtonMatrixComponent } from './components/button-matrix/button-matrix.component';
import { AboutComponent } from './components/about/about.component';
import { ConfiguratorComponent } from './components/configurator/configurator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';

import { ApiModule } from 'src/swagger';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { ChooseCardComponent } from './components/choose-card/choose-card.component';
import { GameMapViewerComponent } from './components/game-map-viewer/game-map-viewer.component';
import { GamesListComponent } from './components/games-list/games-list.component';

export function tokenGetter() {
  return localStorage.getItem("auth-user");
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ApiModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    })
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    LoginComponent,
    AboutComponent,
    ConfiguratorComponent,
    ButtonMatrixComponent,
    UnityGameComponent,
    SignupComponent,
    NavbarComponent,
    ChooseCardComponent,
    HighscoreComponent,
    GameMapViewerComponent,
    GamesListComponent
  ],
  providers: [ApiModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
