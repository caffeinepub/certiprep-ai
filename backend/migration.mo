import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

module {
  type CertificationId = Text;
  type FlashcardId = Nat;

  type OldFlashcard = {
    front : Text;
    back : Text;
    timesCorrect : Nat;
    timesIncorrect : Nat;
  };

  type OldActor = {
    flashcards : Map.Map<CertificationId, List.List<OldFlashcard>>;
  };

  type NewFlashcard = {
    id : FlashcardId;
    front : Text;
    back : Text;
    timesCorrect : Nat;
    timesIncorrect : Nat;
  };

  // Add missing fields from new persistent state
  type NewActor = {
    flashcards : Map.Map<Text, List.List<NewFlashcard>>;
  };

  public func run(old : OldActor) : NewActor {
    let newFlashcards = old.flashcards.map<CertificationId, List.List<OldFlashcard>, List.List<NewFlashcard>>(
      func(_certId, oldList) {
        oldList.map<OldFlashcard, NewFlashcard>(
          func(oldCard) {
            {
              oldCard with
              id = 0;
            };
          }
        );
      }
    );
    { flashcards = newFlashcards };
  };
};
