import { Cocktail, ExtendedIngredientGroup } from 'models/cocktail';
import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { toExtendedIngredientGroup } from 'functions/ingredient-functions';
import { LocalStorageService } from 'services/local-storage-service';

@inject(DialogController, LocalStorageService)
export class CocktailViewModel {
    public cocktail: Cocktail;
    public extendedIngredientGroup: ExtendedIngredientGroup[];
    public controller: DialogController;
    public multiplier = 1;
    public multiplierValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    public isFavorite = false;

    private _favoriteCocktails: number[] = [];

    constructor(dialogContoller: DialogController, private _localStorageService: LocalStorageService) {
        this.controller = dialogContoller;
    }

    activate(cocktail: Cocktail) {
        this.cocktail = cocktail;
        this.extendedIngredientGroup = toExtendedIngredientGroup(cocktail.ingredientGroups);
        this._favoriteCocktails = this._localStorageService.getFavoriteCocktails();
        this.isFavorite = this._favoriteCocktails.includes(cocktail.id);
    }

    toggleHeart() {
        this.isFavorite = !this.isFavorite;

        if (this.isFavorite) {
            this._favoriteCocktails.push(this.cocktail.id);
        } else {
            this._favoriteCocktails = this._favoriteCocktails.filter(id => id !== this.cocktail.id);
        }

        this._localStorageService.updateFavoriteCocktails(this._favoriteCocktails);
    }
}