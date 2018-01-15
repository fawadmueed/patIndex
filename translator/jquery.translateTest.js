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
      css:"trn",
      lang:"en"/*,
      t: {
       "translate": {
          pt:"tradução",
          br:"tradução"
        }
      }*/
    };
    settings = $.extend(settings, options || {});
    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css ="." + settings.css;
       
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
        en:"Treatmen Plan"
      },
     "Paiements":{
        en:"Payments"
      },
     "Historique": {
         pt:"Descarregar plugin",
         en:"History"
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
     "Changer la photo:": { 
        en:""
      },
     "No Dossier": { 
        en:"File Number"
      },
     "Nom": { 
        en:"Name"
      },
     "Prenom": { 
        en:"First Name"
      },
      "Rue": { 
        en:"Street"
      },
     "Ville": { 
        en:"City"
      },
     "Province": { 
        en:"Province"
      },
     "Code Postal": { 
        en:"Postal Code"
      },
     "RAMQ": { 
        en:"RAMQ"
      },
     "Expiration": { 
        en:"Expiration"
      },
     "Principal": { 
        en:"Principal"
      },
     "Cellulaire":{ 
        en:"Cell Phone"
      },
     "Date de naissance": { 
        en:"Date of Birth"
      },
     "Sexe": { 
        en:"Sex"
      },
     "Age": { 
        en:"Age"
      },
     "Bureau": { 
        en:"Office"
      },
     "Poste": { 
        en:"Designation"
      },
     "Courriel": { 
        en:"Email"
      },
     "Envoyer courriel": { 
        en:"Send Email"
      },
     "Langue": { 
        en:"Language"
      },
     "Patient de": { 
        en:"Patient Of"
      },
     "Urgence Seulement": { 
        en:"Urgent Only"
      },
     "Extra": { 
        en:"Extra"
      },
     "Infos Patient": { 
        en:"Info Patient"
      },
     "Employeur": { 
        en:"Employer"
      },
     "Dossier Actif,": { 
        en:"File Active"
      },
     "Oui,": { 
        en:"Yes"
      },
     "Non": { 
        en:"No"
      },
     "Date premiere visite": { 
        en:""
      },
     "Date derniere visite": { 
        en:""
      },
     "Historique des rendez-vous": { 
        en:""
      },
     "Date": { 
        en:""
      },
     "Heaur": { 
        en:""
      },
     "Dentiste": { 
        en:""
      },
     "Duree": { 
        en:""
      },
     "Traitement": { 
        en:""
      },
     "Status": { 
        en:""
      },
     "Description de traitement": { 
        en:""
      },
     "Tous": { 
        en:""
      },
     "Annule": { 
        en:""
      },
     "Manque": { 
        en:""
      },
     "En attente": { 
        en:""
      },
     "Message R": { 
        en:""
      },
     "Oui,": { 
        en:""
      },
     "Non": { 
        en:""
      },
     "Type:": { 
        en:""
      },
     "Agenda": { 
        en:""
      },
     "Rappel": { 
        en:""
      },
     "Date" : { 
        en:""
      },
     "Raison de rappel #1": { 
        en:""
      },
     "Action rappel 1": { 
        en:""
      },
     "Raison de rappel #2": { 
        en:""
      },
     "Action rappel 2": { 
        en:""
      },
     "Intervention Rappel": { 
        en:""
      },
     "Types de paiements ou d'assurances": { 
        en:""
      },
     "Type 1": { 
        en:""
      },
     "Info couverture": { 
        en:" "
      },
     "Type 2": { 
        en:" "
      },
     "Soldes": { 
        en:" "
      },
     "&lt;31 jrs": { 
        en:" "
      },
     "31-60 jrs": { 
        en:" "
      },
     "60-90 jrs": { 
        en:" "
      },
     "&gt;90 jrs": { 
        en:" "
      },
      '<i class=&quot;info icon trn&quot; style=&quot;color: #138d30!important;&quot;></i>Infos Patient">': { 
        en:" ffffaaaaww"
      },

     "Total": { 
        en:""
      },
     "Autres": { 
        en:""
      },
     "AMQ": { 
        en:""
      },
     "ASS": { 
        en:""
      },
     "CAS": { 
        en:""
      },
     "Total": { 
        en:""
      },
     "Ch.P": { 
        en:""
      },
     "Change Patient" : { en:" " },
"Admin" : { en:" " },
"Deconnexion" : { en:" " },
"Print" : { en:" " },
"Laboratories" : { en:" " },
"En" : { en:" " },
"Fr" : { en:" " },
"Patient" : { en:" " },
"Facturation" : { en:" " },
"Docs" : { en:" " },
"Hist" : { en:" " },
"Exam" : { en:" " },
"Odon" : { en:" " },
"Plan RDV" : { en:" " },
"Traits" : { en:" " },
"Rx" : { en:" " },
"Paro" : { en:" " },
"Entente" : { en:" " },
"Code Edit Prix" : { en:" " },
"Dossier Patient" : { en:" " },
"Plan de traitement" : { en:" " },
"Paiements" : { en:" " },
"Historique" : { en:" " },
"Financier" : { en:" " },
"Rappel" : { en:" " },
"Alertes" : { en:" " },
"Creer un dossier" : { en:" " },
"Creation rapide" : { en:" " },
"Modifier" : { en:" " },
"Responsable" : { en:" " },
"Famille" : { en:" " },
"Reference" : { en:" " },
"Dossier consultes" : { en:" " },
"Enregistrer" : { en:" " },
"Impression" : { en:" " },
"Alerte médicale" : { en:" " },
"Suivi médical" : { en:" " },
"Laboratoires" : { en:" " },
"Facture" : { en:" " },
"Rappel de facture" : { en:" " },
"Facturation anticipee" : { en:" " },
"cdanET" : { en:" " },
"Changer la photo" : { en:" " },
"Nom" : { en:" " },
"Prenom" : { en:" " },
"Rue" : { en:" " },
"Ville" : { en:" " },
"Province" : { en:" " },
"Code Postal" : { en:" " },
"RAMQ" : { en:" " },
"Expiration" : { en:" " },
"Date de nais." : { en:" " },
"Sexe" : { en:" " },
"Age" : { en:" " },
"Principal" : { en:" " },
"Cellulaire" : { en:" " },
"Bureau" : { en:" " },
"Poste" : { en:" " },
"Courriel" : { en:" " },
"Langue" : { en:" " },
"French" : { en:" " },
"English" : { en:" " },
"Patient de" : { en:" " },
"Urgence Seulement" : { en:" " },
"Extra" : { en:" " },
"Infos Patient" : { en:" " },
"Employeur" : { en:" " },
"Dossier Actif" : { en:" " },
"Oui" : { en:" " },
"Non" : { en:" " },
"Date premiere visite" : { en:" " },
"Date derniere visite" : { en:" " },
"Historique des rendez-vous" : { en:" " },
"Date" : { en:" " },
"Heaure" : { en:" " },
"Dentiste" : { en:" " },
"Duree" : { en:" " },
"Traitement" : { en:" " },
"Status" : { en:" " },
"Description de traitement" : { en:" " },
"Tous" : { en:" " },
"Annule" : { en:" " },
"Manque" : { en:" " },
"En attente" : { en:" " },
"Message R" : { en:" " },
"Type:" : { en:" " },
"ABC" : { en:" " },
"XYZ" : { en:" " },
"Rappel" : { en:" " },
"Raison de rappel #1" : { en:" " },
"Action rappel 1" : { en:" " },
"Raison de rappel #2" : { en:" " },
"Action rappel 2" : { en:" " },
"Intervention Rappel" : { en:" " },
"Types de paiements ou d'assurances" : { en:" " },
"Type 1" : { en:" " },
"CAS" : { en:" " },
"Desjardin" : { en:" " },
"Info couverture" : { en:" " },
"TEST" : { en:" " },
"Type 2" : { en:" " },
"TD" : { en:" " },
"Soldes" : { en:" " },

"Total" : { en:" " },
"Autres" : { en:" " },
"AMQ" : { en:" " },
"CELL" : { en:" " },
"ASS" : { en:" " },
"Ch.P" : { en:" " },
"ID" : { en:" " },
"Question" : { en:" " },
"Réponse" : { en:" " },
"Notes cliniques" : { en:" " },
"Ajouter" : { en:" " },
"Code" : { en:" " },
"Dent" : { en:" " },
"Surf." : { en:" " },
"Description" : { en:" " },
"Mod." : { en:" " },
"Unités" : { en:" " },
"Prix" : { en:" " },
"Rendez-vous" : { en:" " },
"Supprimer les traitements" : { en:" " },             
"Total du plan de traitement" : { en:" " },
"Supprimer les traitements" : { en:" " },
"Versement" : { en:" " },
"Montant" : { en:" " },
"Note" : { en:" " },
"Supprimer les versements": { en:" " },          
"Ajouter un versement": { en:" " },              
"Total de l'entente :" : { en:" " },
"Supprimer les versements" : { en:" " },
"Ajouter un versement" : { en:" " },
"Codes" : { en:" " },
"Prix ($)" : { en:" " },
"Ramq ($)" : { en:" " },
"Insurance ($)" : { en:" " },
"Special ($)" : { en:" " },
"Price Edit for Code" : { en:" " },
"Previous Prix" : { en:" " },
"New Prix" : { en:" " },
"Close" : { en:" " },
"Update" : { en:" " },
"Description / Protocole" : { en:" " },
"Supprimer les traitements": { en:" " },         
"Ajouter un ou des traitements" : { en:" " },
"Ajouter un ou des traitements" : { en:" " },
"Médicament" : { en:" " },
"Dose" : { en:" " },
"Qté" : { en:" " },
"Fréq" : { en:" " },
"Supprimer les médicaments": { en:" " },
"Ajouter un médicament" : { en:" " },
"Supprimer les médicaments" : { en:" " },
"Ajouter un médicament" : { en:" " },
"Facturation anticipée" : { en:" " },
"CDANET" : { en:" " },
"Régie" : { en:" " },
"Tarif régulier" : { en:" " },
"Tarif spécial" : { en:" " },
"Cas hospitalier" : { en:" " },
"Anesthésie locale" : { en:" " },
"Anesthésie générale" : { en:" " },
"Non applicable" : { en:" " },
"OK" : { en:" " },
"Type" : { en:" " },
"Surface" : { en:" " },
"Frais Lab." : { en:" " },
"Honoraires" : { en:" " },
"Prod" : { en:" " },
"Role" : { en:" " },
"ACE" : { en:" " },
"PlusSupprimer" : { en:" " },
"Plus" : { en:" " },
"Supprimer" : { en:" " },
"Nlle facture" : { en:" " },
"Générer la facture" : { en:" " },
"RobData" : { en:" " },
"PamntMOdalTEst" : { en:" " },
"Factures" : { en:" " },
"Messages" : { en:" " },
"État de compte" : { en:" " },
"Année" : { en:" " },
"Chercher" : { en:" " },
"TestModal" : { en:" " },
"LoadTestData" : { en:" " },
"Dossier" : { en:" " },
"#RAMQ" : { en:" " },
"No de Facture" : { en:" " },
"Prénom" : { en:" " },
"Nombre de factures" : { en:" " },
"Montant total:" : { en:" " },
"Tous les patients" : { en:" " },
"Excel" : { en:" " },
"#AMQ" : { en:" " },
"No reçu" : { en:" " },
"Raison" : { en:" " },
"Paiement" : { en:" " },
"Effectué" : { en:" " },
"Payée" : { en:" " },
"No data available in table" : { en:" " },
"Previous" : { en:" " },
"Next" : { en:" " },
"Factures non payées" : { en:" " },
"Total Facture:" : { en:" " },
"No de paiements" : { en:" " },
"Total paiements" : { en:" " },
"Tous les factures" : { en:" " },
"Factures Payées" : { en:" " },
"Télé. Paiements" : { en:" " },
"No de facture" : { en:" " },
"#Facture" : { en:" " },
"Status de recevabilitié" : { en:" " },
"Tous les messages" : { en:" " },
"Messages dérreur" : { en:" " },
"Date entre" : { en:" " },
"#État de compte" : { en:" " },
"Télé Etat. compte" : { en:" " },
"Imprimer" : { en:" " },
"Supprimer les traitements" : { en:" " },
"En bouche" : { en:" " },
"À faire" : { en:" " },
"À surveiller" : { en:" " },
"Code" : { en:" " },
"Dent" : { en:" " },
"Surface" : { en:" " },
"Description" : { en:" " },
"Note ou commentaire" : { en:" " },
"Code" : { en:" " },
"Dent" : { en:" " },
"Surface" : { en:" " },
"Description" : { en:" " },
"Note ou commentaire" : { en:" " },
"Code" : { en:" " },
"Dent" : { en:" " },
"Surface" : { en:" " },
"Description" : { en:" " },
"Note ou commentaire" : { en:" " },
"Signature" : { en:" " },
"Valider" : { en:" " },
"Signature" : { en:" " },
"Questionnaire" : { en:" " },
"Suivant" : { en:" " },
"Rechercher un patient" : { en:" " },
"Numéro" : { en:" " },
"NAM" : { en:" " },
"Date de naissance" : { en:" " },
"Fusion nouveau patient" : { en:" " },
"Rechercher dans Vision-R" : { en:" " },
"Accepter" : { en:" " },
"Effacer" : { en:" " },
"Ajouter / modifier un suivi de laboratoire" : { en:" " },
"Nom, prénom" : { en:" " },
"Nom du labo" : { en:" " },
"Date envoyé" : { en:" " },
"Date retour" : { en:" " },
"Date et heure RDV" : { en:" " },
"Reçu" : { en:" " },
"Ajouter un laboratoire" : { en:" " },
"Précédent" : { en:" " },
"Fermer" : { en:" " },
"Attribution d'un numéro de dossier" : { en:" " },
"Consulter la liste des numéros retirés ou détruits" : { en:" " },
"Accepter le numéro de dossier suggéré" : { en:" " },
"Le patient possède-t-il deux assurances?" : { en:" " },
"Oui" : { en:" " },
"Assurance" : { en:" " },
"Renseignements - Assurance" : { en:" " },
"Assuré principal" : { en:" " },
"Code Assurance" : { en:" " },
"ICDANet" : { en:" " },
"Choisir parmi les patients du dentiste" : { en:" " },
"No de police" : { en:" " },
"No de certificate" : { en:" " },
"No de sequence" : { en:" " },
"Compte/Div" : { en:" " },
"Suffixe" : { en:" " },
"Initiale" : { en:" " },
"English" : { en:" " },
"French" : { en:" " },
"Adresse" : { en:" " },
"Code de parente" : { en:" " },
"Code de dependance" : { en:" " },
"Assuré secondaire" : { en:" " },
"Code Ass.Sec" : { en:" " },
"Choisir parmi les patients du dentiste" : { en:" " },
"Copier les coordonnées de l assuré principal" : { en:" " },
"Renseignements supplémentaires" : { en:" " },
"Code d'exception" : { en:" " },
"Nom de l'etablissement" : { en:" " },
"Enregistrer" : { en:" " },
"Annuler" : { en:" " },
"Responsable" : { en:" " },
"Responsable Financier du patient" : { en:" " },
"Salutation et # de dossier du responsable" : { en:" " },
"Mr" : { en:" " },
"MLLE" : { en:" " },
"MME" : { en:" " },
"Autre" : { en:" " },
"Le Solde inclus :" : { en:" " },
"Nom du patient" : { en:" " },
"Solde pour AC" : { en:" " },
"Autres Solde" : { en:" " },
"Cell" : { en:" " },
"Gestion des rappels" : { en:" " },
"Intervention de rappel" : { en:" " },
"Date et heure" : { en:" " },
"No. Tel. compose" : { en:" " },
"Repondant" : { en:" " },
"Disposition" : { en:" " },
"Repondu" : { en:" " },
"Ligne engagee" : { en:" " },
"Ne repond pas" : { en:" " },
"Laisee un message" : { en:" " },
"Va rappeler" : { en:" " },
"Confirm RV" : { en:" " },
"Va rappeler pour RV" : { en:" " },
"Appel place par:" : { en:" " },
"Notes complementaires" : { en:" " },
"Date - Heure" : { en:" " },
"No tel.appele" : { en:" " },
"Appel place par" : { en:" " },
"Notes" : { en:" " },
"Info Couverture" : { en:" " },
"Indemnites" : { en:" " },
"Date debut" : { en:" " },
"Montant admissible" : { en:" " },
"Date fin" : { en:" " },
"Montant utilise" : { en:" " },
"Montant restant" : { en:" " },
"Alerte" : { en:" " },
"Medicale" : { en:" " },
"Financiere" : { en:" " },
"Entrer Alerte" : { en:" " },
"Alertes medicales" : { en:" " },
"Alertes Financieres" : { en:" " },
"Alertes Rendez-vous" : { en:" " },
"Numeros retires ou detruits" : { en:" " },
"Famille" : { en:" " },
"Le Solde includ : CAS" : { en:" " },
"Chercher Patient" : { en:" " },
"Retirer" : { en:" " },
"Information additionnelle" : { en:" " },
"References et employeur" : { en:" " },
"Medical" : { en:" " },
"En passant" : { en:" " },
"Internet" : { en:" " },
"PubliPos" : { en:" " },
"Aucune" : { en:" " },
"References" : { en:" " },
"Titre" : { en:" " },
"Prenom" : { en:" " },
"Ville" : { en:" " },
"Province" : { en:" " },
"Couriel" : { en:" " },
"Telephone" : { en:" " },
"Facture" : { en:" " },
"Paiement" : { en:" " },
"Assurance" : { en:" " },
"Transférer à l'assurance" : { en:" " },
"RENSEIGNEMENTS COMPLÉMENTAIRES RÉGIE" : { en:" " },
"Carte d'assurance-maladie" : { en:" " },
"Remboursement demandé par Patient" : { en:" " },
"PROFESSIONEL" : { en:" " },
"No du professionel" : { en:" " },
"No du groupe" : { en:" " },
"Compte Personnel" : { en:" " },
"Compte Administratif" : { en:" " },
"Lieu de dispensation" : { en:" " },
"Identification du lieu" : { en:" " },
"Lieu codifié á la Régie" : { en:" " },
"Lieu non codifié" : { en:" " },
"Numéro du lieu" : { en:" " },
"Code localité" : { en:" " },
"No. bureau" : { en:" " },
"Secteur d'activité" : { en:" " },
"Clinique externe" : { en:" " },
"Clinique d’urgence" : { en:" " },
"Centre de douleur chronique" : { en:" " },
"Section gériatrique" : { en:" " },
"Section psychiatrique" : { en:" " },
"Unité coronarienne" : { en:" " },
"Unité de soins de longue durée (hébergement)" : { en:" " },
"Unité de soins de longue durée (prolongés)" : { en:" " },
"Unité de soins généraux et spécialisés" : { en:" " },
"Unité de soins intensifs" : { en:" " },
"Type de lieu" : { en:" " },
"Cabinet" : { en:" " },
"Domicile" : { en:" " },
"Code diagnostic" : { en:" " },
"Date de l'événement" : { en:" " },
"Période d'hospi." : { en:" " },
"Date d'entrée" : { en:" " },
"Date de sortie" : { en:" " },
"Transférer à la Règie" : { en:" " },
"PAIEMENT" : { en:" " },
"Solde Actuel" : { en:" " },
"PERS" : { en:" " },
"POST-DATÉS" : { en:" " },
"Total Facture" : { en:" " },
"ARGENT" : { en:" " },
"DÉBIT" : { en:" " },
"CRÉDIT" : { en:" " },
"VISA" : { en:" " },
"AMEX" : { en:" " },
"Master Card" : { en:" " },
"No" : { en:" " },
"Nb" : { en:" " },
"Chéque" : { en:" " },
"MC" : { en:" " },
"Financement" : { en:" " },
"Fractioner les paiements" : { en:" " },
"TOTAL" : { en:" " },
"Lab %" : { en:" " },
"Cocher les cases appropriées" : { en:" " },
"Formulaire d'assurance" : { en:" " },
"Facture ou un reçu" : { en:" " },
"Envoyer par courriel" : { en:" " },
"Fractionner Paiement" : { en:" " },
"Products" : { en:" " },
"Montant Total :" : { en:" " },
"retour a facturation" : { en:" " },
"Enregistere" : { en:" " },
"Rappel de Facture" : { en:" " },
"Facturation anticipee" : { en:" " },
"Regie Facture Modal" : { en:" " },
"Identification du patient" : { en:" " },
"Exp" : { en:" " },
"Ancienne facture" : { en:" " },
"No facture" : { en:" " },
"No code" : { en:" " },
"Nouvelle facture" : { en:" " },
"RENSEIGNEMENTS COMPLÉMENTAIRES RÉGIE" : { en:" " },
"PROFESSIONEL" : { en:" " },
"Événement" : { en:" " },
"Carie dentaire" : { en:" " },
"Etat normal" : { en:" " },
"Lieu de dispensation" : { en:" " },
"No. bureau." : { en:" " },
"Clinique externe" : { en:" " },
"Clinique d’urgence" : { en:" " },
"Centre de douleur chronique" : { en:" " },
"Section gériatrique" : { en:" " },
"Section psychiatrique" : { en:" " },
"Unité coronarienne" : { en:" " },
"Unité de soins de longue durée (hébergement)" : { en:" " },
"Unité de soins de longue durée (prolongés)" : { en:" " },
"Unité de soins généraux et spécialisés" : { en:" " },
"Unité de soins intensifs" : { en:" " },
"Transférer à la Régie" : { en:" " },
"Detail facture" : { en:" " },
"Liste des codes et tarifs" : { en:" " },
"Annuler fact. à la Régie" : { en:" " },
"Quitter" : { en:" " },
"cdanET" : { en:" " },
"Renseignements - Reclamations CDANET" : { en:" " },
"Type de transaction:" : { en:" " },
"Requerant:" : { en:" " },
"Payable à:" : { en:" " },
"At the dentist" : { en:" " },
"At the insured" : { en:" " },
"At another person" : { en:" " },
"No de confirmation du plan" : { en:" " },
"Date de l'accident:" : { en:" " },
"Placement initial ?" : { en:" " },
"Lettre" : { en:" " },
"S'agit-il de traitements en vue de soins orthodontiques?" : { en:" " },
"non" : { en:" " },
"Informations complementaires Régie" : { en:" " },
"DENTISTE" : { en:" " },
"Prothèse en acrylique" : { en:" " },
"No d'autorisation" : { en:" " },
"Date d'autorisation" : { en:" " },
"Traitement dentaire" : { en:" " },
"Type" : { en:" " },
"Site" : { en:" " },
"Médicament consommé" : { en:" " },
"+" : { en:" " },
"Éléments de contexte" : { en:" " },
"Acte posé plus souvent que convenu à l entente" : { en:" " },
"Chirurgie secondaire pratiquée au cours d une même séance qu une chirurgie principale" : { en:" " },
"Examen ou soin post-opératoire qui n est pas en lien avec la chirurgie" : { en:" " },
"Mise en place de la première plaque de reconstruction" : { en:" " },
"Nouvelle intervention qui est reliée à la première ou en résulte lors d une même hospitalisation" : { en:" " },
"Nouvelle intervention qui n est pas reliée à la première ou n en résulte pas lors d une même hospitalisation" : { en:" " },
"Patient sous anesthésie générale " : { en:" " },
"Remplacement d une prothèse pour perte ou bris " : { en:" " },
"Remplacement de deux prothèses pour perte ou bris " : { en:" " },
"Séance différente " : { en:" " },
"Service dont la complexité est inhabituelle " : { en:" " },
"Service fourni en centre hospitalier avec le concours d'un ou de dentistes résidents dans un programme visé " : { en:" " },
"Site différent " : { en:" " },
"Soin pré-opératoire qui n est pas en lien avec la chirurgie " : { en:" " },
"Soins d urgence " : { en:" " },
"Soins post-opératoire confiés à un autre dentiste " : { en:" " },
"Soins post-opératoire confiés par un autre dentiste " : { en:" " },
"Suite à un traumatisme " : { en:" " },
"Suite à une malformation osseuse " : { en:" " },
"Élements mesurables" : { en:" " },
"Kilomètres" : { en:" " },
"Nombre d'injections" : { en:" " },
"Durée activités administratives" : { en:" " },
"Date De Service" : { en:" " },
"Lieu de référence" : { en:" " },
"Situation liée au lieu de référence" : { en:" " },
"Lieu codifié à la Régie" : { en:" " },
"Code postal" : { en:" " },
"Référant" : { en:" " },
"No de référant" : { en:" " },
"Type de référant" : { en:" " },
"Professionnel référant" : { en:" " },
"Professionnel remplacé" : { en:" " },
"CHIRURGIENS" : { en:" " },
"Renseignements complémentaires Régie (Chirguen)" : { en:" " },
"Type" : { en:" " },
"DENTUROLOGISTE" : { en:" " },
"Prothése en acrylique" : { en:" " },
"Remplacement d une prothèse pour perte ou bris" : { en:" " },
"Remplacement de deux prothèses pour perte ou bris" : { en:" " },
"Séance différente" : { en:" " },
"Site différent" : { en:" " },
"Submit" : { en:" " },
"Protocoles" : { en:" " },
"DIAGN" : { en:" " },
"PRÉV" : { en:" " },
"ANESTH" : { en:" " },
"ENDO" : { en:" " },
"D.O" : { en:" " },
"CHIR" : { en:" " },
"PARO" : { en:" " },
"ORTHO" : { en:" " },
"PPA" : { en:" " },
"PPF" : { en:" " },
"IMPLANT" : { en:" " },
"Cancel" : { en:" " },
"Ramq Credential Expiration" : { en:" " },
"Ok" : { en:" " },
"Notes et commentaires" : { en:" " },
"Entrez une note ou un commentaire" : { en:" " },
"Traitements" : { en:" " },
"REST" : { en:" " },
"PCO" : { en:" " },
"PCP" : { en:" " },
"Laboratoires" : { en:" " },
"Sélection buccale ou labiale" : { en:" " },
"B" : { en:" " },
"L" : { en:" " },
"Sélection médiale ou distale" : { en:" " },
"M" : { en:" " },
"D" : { en:" " },
"Sélectionnez le type de dentiste" : { en:" " },
"Chirurgien dentiste" : { en:" " },
"Denturologiste" : { en:" " },
"Sélection des surfaces" : { en:" " },
"O" : { en:" " },
"Sélection de la dent" : { en:" " },
"Odontogramme" : { en:" " },
"OBS" : { en:" " },
"Sélection buccale ou labiale" : { en:" " },
"Sélection médiale ou distale" : { en:" " },
"Sélection des surfaces" : { en:" " },
"Informations complementaires Régie - Deatail Facture" : { en:" " },
"Remplacement d une prothèse pour perte ou bris" : { en:" " },
"Séance différente" : { en:" " },
"Site différent" : { en:" " },
"Dossier Consultes" : { en:" " },
"NOM" : { en:" " },
"PRENOM" : { en:" " },
"DOSSIER" : { en:" " },
"Annuler" : { en:" " },
"Ajouter / modifier un suivi médical" : { en:" " },
"Entrez un suivi médical" : { en:" " },
"Ajouter / modifier une alerte médicale" : { en:" " },
"Entrez une alerte médicale" : { en:" " },
"Appliquer un paiement" : { en:" " },
"No de reçu" : { en:" " },
"Effectué le" : { en:" " },
"Sauvegarder" : { en:" " },
"Ajouter un document" : { en:" " },
"Choisir un fichier" : { en:" " },
"Entrez un commentaire" : { en:" " },
"Correction d'un traitement" : { en:" " },
"Entrez une correction" : { en:" " },
"Notes et corrections" : { en:" " },
"Entrez une note ou une correction" : { en:" " },
"Notes et corrections" : { en:" " },
"Réponse" : { en:" " },
"Entrez une réponse" : { en:" " },
"Modifier un versement" : { en:" " },
"Date du versement" : { en:" " },
"Entrez un montant" : { en:" " },
"Commentaires" : { en:" " },
"Ajouter / modifier un médicament" : { en:" " },
"Quantité" : { en:" " },
"Fréquence" : { en:" " },
"Dossier patient de Vision-R" : { en:" " },
"Prénom du patient" : { en:" " },
"Numéro de dossier" : { en:" " },
"Amalgame" : { en:" " },
"Composite" : { en:" " },
"Examen complet" : { en:" " },
"Examen de rappel" : { en:" " },
"Commentaires" : { en:" " },
"Mesures parodontiques" : { en:" " },
"Entrez votre code d'accès" : { en:" " },

  "Réclamation électronique pour Dr Pierre Laberge. Êtes-vous sur de vouloir transmettre la requête?": { 
    en:""
    ,fr:"Réclamation électronique pour Dr Pierre Laberge. Êtes-vous sur de vouloir transmettre la requête?"
    },
    "Le patient est-il courvert par une deuxième assurance ? ": { 
    en:""
    ,fr:"Le patient est-il courvert par une deuxième assurance ?"
    },
    "Transférer à la Règie": { 
    en:" "
    ,fr:"Transférer à la Règie "
    },
    "La facture est associée à une demande de remboursement d'un bénéficiare.": { 
    en:" "
    ,fr:"La facture est associée à une demande de remboursement d'un bénéficiare."
    }
    
    }
    
    





                          
    // // }