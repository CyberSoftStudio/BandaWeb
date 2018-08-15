import {RU} from '../dictionaries/ru';
import {EN} from '../dictionaries/en';
import {EventEmitter, Injectable} from '@angular/core';
import {config} from '../config';

/**
 * @name TranslatorService
 * @summary Service to translate values by keys from according dictionaries.
 */
@Injectable()
export class TranslatorService {
    public dictionary: {};
    public currentLang: string;
    public langList: any;
    public changeLang$ = new EventEmitter<{
        lang: string
    }>();
    constructor() {
        this.langList = config().app.lang_list;
        this.currentLang = config().app.default_lang;
    }
    /**
     * @name set
     * @summary Sets translation language.
     * @public
     * @param {string} lang - translation language.
     */
    public set(lang: string) {
        const setDictionary = {
            RU: () => {
                this.dictionary = RU;
                return true;
            },
            EN: () => {
                this.dictionary = EN;
                return true;
            }
        };
        if (!setDictionary[lang]()) {
            this.dictionary = config().app.default_lang;
        }
        this.currentLang = lang;
        this.changeLang$.emit({lang: lang});
    }
    /**
     * @name translate
     * @summary Translates key value from according dictionary.
     * @param {string} key - key from setted dictionary.
     * @return {string} string - translated key value.
     */
    public translate(key: string): string {
        const k = {
            key1: key.split('.')[0],
            key2: key.split('.')[1]} || null;
        return key && this.dictionary[k.key1][k.key2] ? this.dictionary[k.key1][k.key2] : '';
    }
}
