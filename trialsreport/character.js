/**
 * Character model.
 *
 * @constructor
 * @param {Object} character Character base.
 * @param {Object} inventory Character inventory.
 * @param {Object} definitions Definitions lookup.
 * @private
 */
export default class Character {
  constructor(character, inventory, definitions) {
    this.definitions = definitions;
    this.inventory = inventory;

    this.base = character.characterBase;
    this.stats = character.stats;
  }

  /**
   * Cool down calculations.
   *
   * @param {String} type Name of the stat.
   * @param {Number} tier Tier of the stat.
   * @public
   */
  cooldown(type, tier) {
    const subclass = this.subclassName();
    let cooldowns;

    switch (type) {
      //
      // Discipline is the only cool down that is consistent between all
      // subclasses.
      //
      case 'discipline':
        cooldowns = [ '1:00', '0:55', '0:49', '0:42', '0:34', '0:25' ];
      break;

      //
      // For intellect, most "defensive" supers have a lower cool down that
      // other supers so we need to return the correct set based on subclass.
      //
      case 'intellect':
        if (['Sunsinger', 'Defender', 'Striker', 'Nightstalker'].indexOf(subclass)) {
          cooldowns = [ '5:00', '4:46', '4:31', '4:15', '3:58', '3:40' ];
        } else {
          cooldowns = [ '5:30', '5:14', '4:57', '4:39', '4:20', '4:00' ];
        }
      break;

      //
      // Basically if you have an active charge that can throw stuff, it will take
      // longer to charge so again, return the correct set based on subclass.
      //
      case 'strength':
        if (['Gunslinger', 'Nightstalker'].indexOf(subclass)) {
          cooldowns = [ '1:10', '1:04', '0:57', '0:49', '0:40', '0:29' ];
        } else {
          cooldowns = [ '1:00', '0:55', '0:49', '0:42', '0:34', '0:25' ];
        }
      break;
    }

    return cooldowns[tier];
  }

  /**
   * Returns the correct bucket id for a given slot.
   *
   * @returns {Number} Bucket id.
   * @public
   */
  slot(what) {
    switch (what) {
      case 'primary':
      return 1498876634;

      case 'special':
      case 'secondary':
      return 2465295065;

      case 'heavy':
      return 953998645;

      case 'ghost':
      return 4023194814;

      case 'head':
      case 'helmet':
      return 3448274439;

      case 'chest':
      case 'body':
      return 14239492;

      case 'arm':
      case 'arms':
      case 'glove':
      case 'gloves':
      case 'gauntlet':
      case 'gauntlets':
      return 3551918588;

      case 'leg':
      case 'legs':
      case 'boot':
      case 'boots':
      case 'greave':
      case 'greaves':
      return 20886954;

      case 'class':
      case 'mark':
      case 'bond':
      case 'cape':
      case 'cloak':
      return 1585787867;

      case 'artifact':
      return 0;
    }
  }

  /**
   * Get the tier of a given value.
   *
   * @param {Number} value Stat value who's tier needs to be calculated.
   * @public
   */
  tier(value) {
    const max = 300;

    return Math.floor(Math.min(value, max) / (max / 5));
  }

  /**
   * Return the league of Elo that the user is currently in.
   *
   * @param {Number} rating Current rating
   * @returns {String} The current league.
   * @public
   */
  leagues(rating) {
    rating = Math.round(rating);

    if (rating >= 0 && rating <= 1099) return 'bronze';
    else if (rating >= 1100 && rating <= 1299) return 'silver';
    else if (rating >= 1300 && rating <= 1499) return 'gold';
    else if (rating >= 1500 && rating <= 1699) return 'platinum';
    else if (rating >= 1700 && rating <= 9999) return 'diamond';
  }

  /**
   * Return a human readable class name for this character.
   *
   * @returns {String} Name of the class.
   * @public
   */
  className() {
    const id = this.base.classHash;

    if (id === 2271682572) return 'Warlock';
    if (id === 671679327) return 'Hunter';
    if (id === 3655393761) return 'Titan';
  }

  /**
   * Return a human readable sub class name for this character.
   *
   * @returns {String} Name of the class.
   * @public
   */
  subclassName() {
    const id = '';

    if (id === 21395672) return 'Sunbreaker';
    if (id === 2007186000) return 'Defender';
    if (id === 2455559914) return 'Striker';
    if (id === 3658182170) return 'Sunsinger';
    if (id === 3828867689) return 'Voidwalker';
    if (id === 1256644900) return 'Stormcaller';
    if (id === 1716862031) return 'Gunslinger';
    if (id === 4143670657) return 'Nightstalker';
    if (id === 2962927168) return 'Bladedancer';
  }
}
