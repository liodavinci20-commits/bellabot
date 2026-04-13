import { LESSON_ARRAYS_PRATIQUE }           from './arrays-pratique'
import { LESSON_ARRAYS_ACTIF }              from './arrays-actif'
import { LESSON_ARRAYS_ACTIF_VISUEL }       from './arrays-actif-visuel'
import { LESSON_ARRAYS_VISUEL_INTUITIF }    from './arrays-visuel-intuitif'
import { LESSON_ARRAYS_VISUEL_SEQUENTIEL }  from './arrays-visuel-sequentiel'

// Mappe profil → leçon correspondante
const LESSONS_BY_PROFILE = {
  pratique:            LESSON_ARRAYS_ACTIF,              // Actif + Sensoriel
  visuel:              LESSON_ARRAYS_ACTIF_VISUEL,       // Actif + Visuel
  'visuel-intuitif':   LESSON_ARRAYS_VISUEL_INTUITIF,    // Visuel + Intuitif
  'visuel-sequentiel': LESSON_ARRAYS_VISUEL_SEQUENTIEL,  // Visuel + Séquentiel
}

export function getLessonByProfile(profileId) {
  return LESSONS_BY_PROFILE[profileId] ?? LESSON_ARRAYS_PRATIQUE
}
