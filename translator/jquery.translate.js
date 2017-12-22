/**
 * @file jquery.translate.js
 * @brief jQuery plugin to translate text in the client side.
 * @author Manuel Fernandes
 * @site
 * @version 0.9
 * @license MIT license <http://www.opensource.org/licenses/MIT>
 *
 * translate.js is a jQuery plugin to translate text in the client side.
 *
 */

(function($){

  $.fn.translate = function(options) {

    var that = this; //a reference to ourselves
	
    var settings = {
      css: "trn",
      lang: "en"/*,
      t: {
        "translate": {
          pt: "tradução",
          br: "tradução"
        }
      }*/
    };
    settings = $.extend(settings, options || {});
    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css = "." + settings.css;
       
    var t = settings.t;
 
    //public methods
    this.lang = function(l) {
      if (l) {
        settings.lang = l;
        this.translate(settings);  //translate everything
      }
        
      return settings.lang;
    };


    this.get = function(index) {
      var res = index;

      try {
        res = t[index][settings.lang];
      }
      catch (err) {
        //not found, return index
        return index;
      }
      
      if (res)
        return res;
      else
        return index;
    };

    this.g = this.get;


    
    //main
    this.find(settings.css).each(function(i) {
      var $this = $(this);

      var trn_key = $this.attr("data-trn-key");
      if (!trn_key) {
        trn_key = $this.html();
        $this.attr("data-trn-key", trn_key);   //store key for next time
      }

      $this.html(that.get(trn_key));
    });
    
    
		return this;
		
		

  };

  


})(jQuery);


 var dict={
  //TABS
      "Dossier Patient": {
        en:"Patient File"
        
      },
      "Facturation":{
        en:"Billing"
      },
      "Plan de traitement": {
        en: "Treatmen Plan"
      },
      "Paiements":{
        en:"Payments"
      },
      "Historique": {
         pt: "Descarregar plugin",
         en: "History"
      },
      "Financier":{
        en:"Financials"
      },
      "Rappel":{
        en:"Reminder"
      },
      "Alertes":{
        en:"Alerts"
      },
     
       //DOSSIER Patient - Form
      "Changer la photo: ": { 
        en: " "
      },
      "No Dossier ": { 
        en: "File Number"
      },
      "Nom ": { 
        en: "Name"
      },
      "Prenom": { 
        en: "First Name"
      },
       "Rue": { 
        en: "Street"
      },
      "Ville ": { 
        en: "City"
      },
      "Province": { 
        en: "Province"
      },
      "Code Postal": { 
        en: "Postal Code"
      },
      "RAMQ ": { 
        en: "RAMQ"
      },
      "Expiration": { 
        en: "Expiration"
      },
      "Principal": { 
        en: "Principal"
      },
      "Cellulaire":{ 
        en: "Cell Phone"
      },
      "Date de naissance": { 
        en: "Date of Birth"
      },
      "Sexe": { 
        en: "Sex"
      },
      "Age": { 
        en: "Age"
      },
      "Bureau ": { 
        en: "Office"
      },
      "Poste": { 
        en: "Designation"
      },
      "Courriel": { 
        en: "Email"
      },
      "Envoyer courriel": { 
        en: "Send Email"
      },
      "Langue": { 
        en: "Language"
      },
      "Patient de": { 
        en: "Patient Of"
      },
      "Urgence Seulement": { 
        en: "Urgent Only"
      },
      "Extra": { 
        en: "Extra"
      },
      "Infos Patient": { 
        en: "Info Patient"
      },
      "Employeur": { 
        en: "Employer"
      },
      "Dossier Actif,": { 
        en: "File Active"
      },
      "Oui,": { 
        en: "Yes"
      },
      "Non": { 
        en: "No"
      },
      "Date premiere visite": { 
        en: " "
      },
      "Date derniere visite": { 
        en: " "
      },
      "Historique des rendez-vous": { 
        en: " "
      },
      "Date": { 
        en: " "
      },
      "Heaur": { 
        en: " "
      },
      "Dentiste": { 
        en: " "
      },
      "Duree": { 
        en: " "
      },
      "Traitement": { 
        en: " "
      },
      "Status": { 
        en: " "
      },
      "Description de traitement": { 
        en: " "
      },
      "Tous": { 
        en: " "
      },
      "Annule": { 
        en: " "
      },
      "Manque": { 
        en: " "
      },
      "En attente": { 
        en: " "
      },
      "Message R": { 
        en: " "
      },
      "Oui,": { 
        en: " "
      },
      "Non": { 
        en: " "
      },
      "Type:": { 
        en: " "
      },
      "Agenda": { 
        en: " "
      },
      "Rappel": { 
        en: " "
      },
      "Date" : { 
        en: " "
      },
      "Raison de rappel #1": { 
        en: " "
      },
      "Action rappel 1": { 
        en: " "
      },
      "Raison de rappel #2": { 
        en: " "
      },
      "Action rappel 2": { 
        en: " "
      },
      "Intervention Rappel": { 
        en: " "
      },
      "Types de paiements ou d'assurances": { 
        en: " "
      },
      "Type 1": { 
        en: " "
      },
      "Info couverture": { 
        en: " "
      },
      "Type 2": { 
        en: " "
      },
      "Soldes": { 
        en: " "
      },
      "'<'31 jrs": { 
        en: " "
      },
      "31-60 jrs": { 
        en: " "
      },
      "60-90 jrs": { 
        en: " "
      },
      "'>'90 jrs": { 
        en: " "
      },
      "Total": { 
        en: " "
      },
      "Autres": { 
        en: " "
      },
      "AMQ": { 
        en: " "
      },
      "ASS": { 
        en: " "
      },
      "CAS": { 
        en: " "
      },
      "Total": { 
        en: " "
      },
      "Ch.P": { 
        en: " "
      }
    }


                          
    // // }