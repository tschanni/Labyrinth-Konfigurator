import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UnityGameComponent } from './components/unity-game/unity-game.component';
import { ButtonMatrixComponent } from './components/button-matrix/button-matrix.component';
import { AboutComponent } from './components/about/about.component';
import { ConfiguratorComponent } from './components/configurator/configurator.component';
import { SignupComponent } from './components/signup/signup.component';
import { HighscoreComponent } from './components/highscore/highscore.component';
import { GamesListComponent } from './components/games-list/games-list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'game/:gameid', component: UnityGameComponent},
  { path: 'game', component: UnityGameComponent},
  { path: 'gameslist', component: GamesListComponent},
  //{ path: 'buttonmatrix', component: ButtonMatrixComponent},
  { path: '', component: LandingPageComponent},
  { path: 'about', component: AboutComponent},
  { path: 'configurator', component: ConfiguratorComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'score', component: HighscoreComponent}
  // { path: 'configurator', component: ConfiguratorComponent, children: [{path: 'firststep', component: FirststepComponent}]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
