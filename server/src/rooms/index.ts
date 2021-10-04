
import { unconference, cockatrice, dragon, naga, skeleton, tengu, yak} from './unconfRooms'
import { breakout1, breakout2, breakout3, breakout4, theater } from './theater'
import { loungeDungeonRoomData } from './loungeDungeon'
import { sfHub, robots, timeMachine} from './sfHub'
import { oldHub, Oracle, jelly, vault } from './oldHub'

export interface NoteWallData {
  roomWallDescription: string
  noteWallButton: string
  addNoteLinkText: string
  addNotePrompt: string
  noteWallDescription: string
}

export enum SpecialFeature {
  RainbowDoor = 'RAINBOW_DOOR',
  DullDoor = 'DULL_DOOR',
  FullRoomIndex = 'FULL_ROOM_INDEX',
  VendingMachine = 'VENDING_MACHINE'
}

export interface Room {
  // e.g. "kitchen"
  id: string

  // e.g. "GitHub HQ: Kitchen"
  displayName: string

  // e.g. "the kitchen"
  shortName: string

  description: string

  // If false, webRTC audio/video chat is blocked
  noMediaChat?: boolean

  // Indicates whether the room should let users place post-it notes
  // As we add more pieces of one-off functionality,
  // having a bunch of ad-hoc flags like this will probably get frustrating quickly.
  // We may want to eventually refactor to something resembling an ECS.
  hasNoteWall?: boolean
  noteWallData?: NoteWallData

  // If true, don't show the room in the side list
  hidden?: boolean

  specialFeatures?: SpecialFeature[]

  // The GUID for a corresponding ACS videochat room
  // This should hopefully eventually be auto-generated and mandatory
  // but hand-coding for testing purposes now
  chatGuid?: string
}

const indexRoomData: { [name: string]: Room } = {
  theater,
  breakout1,
  breakout2,
  breakout3,
  breakout4,
  unconference,
  cockatrice,
  dragon,
  naga,
  skeleton,
  tengu,
  yak,
  sfHub,
  robots,
  timeMachine,
  oldHub,
  Oracle,
  jelly,
  vault,
  entryway: {
    id: 'entryway',
    displayName: 'Registration Desk',
    shortName: 'the registration desk',
    description: 'A big banner reads \'Welcome to Roguelike Celebration 2021!\' Once you\'ve got your bearings about you, you can move to the [[Central Hall->hall]].',
    hidden: true
  },
  hall: {
    id: 'hall',
    displayName: 'Central Hall',
    shortName: 'the hall',
    description: `A large open area, a meeting place. There is a curious-looking vending machine labelled "Munxip's Magnifient Munchies" and a button you can press marked [[Get Random Food->generateFood]].
    <br/><br/>
    A plaque next to the wall shows a list of <a href="https://github.com/lazerwalker/azure-mud/graphs/contributors" target="_blank" rel="noreferrer">code contributors</a>. There's also a [[swag table]] set up.
    <br/><br/>
      You can get to the [[bar]] or grab a seat in the [[main theater area->theater]]. A short hallway leads to the [[unconferencing rooms->unconference]] There's also two longer hallways, and it's hard from here to tell where they'll go: one shining with [[glass and chrome->sfHub]], and one [[overgrown with plant life->exploreHub]].`,
    hasNoteWall: true,
    noteWallData: {
      roomWallDescription: 'A large bulletin board is here, with a banner on top - "Social Space Feedback". An array of markers and sticky notes are nearby.',
      noteWallButton: 'Add feedback',
      addNoteLinkText: 'Add feedback',
      addNotePrompt: 'What feedback do you have about the social space itself?',
      noteWallDescription: 'Social Space Feedback'
    }
  },
  swag: {
    id: 'swag',
    displayName: 'Swag Table',
    shortName: 'the swag table',
    description: `A table covered in a giant messy pile of mismatched swag. At the top of the pile, you see items such as [[Roguelike Celebration mousepads->item]], [[a +1 longbow->item]], [[an unidentified scroll->item]], and (surprisingly!) [[a tiny puppy->item]].<br/><br/>
    There is also a set of <a href="https://www.aatwebstore.com/rc2021/shop/home" target="_blank">beautiful physical shirts and mousepads you can buy in real life</a>, designed by <a href="https://marlowedobbe.com/" target="_blank">Marlowe Dobbe</a> and printed by Ann Arbor T-shirt Company.
    <br/><br/>
    From here, you can walk back to the rest of the [[hall]].`
  },
  bar: {
    id: 'bar',
    displayName: 'Bar',
    shortName: 'the bar',
    description: `A beautiful long bar with hundreds of bottles spanning up to the ceiling. A friendly bartender will happily make you whatever you want. A laminated sign on the bartop advertises tonight\'s specials: [[Divine Nectar->item]] (a locally crafted mead), [[the Fizzbuzz->item]] (a non-alcoholic flavored seltzer), and [[Yet Another Silly Drink->item]] (a colorful, layered drink with a toy cockatrice).<br/>A self-serve table has two coolers packed to the brim with potions. One is loaded with [[colourful potions->drinkPolymorph]] of many shapes and hues, and the other with [[plain potions of clear liquid->drinkCancellation]]<br/><br/>
    There are three booths you can sit at, labelled [[A->barBoothA]], [[B->barBoothB]], and [[C->barBoothC]]. You\'re a stone\'s throw away from the [[dance floor->danceFloor]], [[theater]], and the [[Central Hall->hall]].`,
    hasNoteWall: true,
    noteWallData: {
      roomWallDescription: 'The wall to the bathroom is covered in strange markings.',
      noteWallButton: 'Add your mark',
      addNoteLinkText: 'Contribute',
      addNotePrompt: 'Contribute to the graffitti?',
      noteWallDescription: 'Someone has scratched ‘Rodney was here’ on an absurdly large unisex bathroom stall wall.'
    }
  },
  danceFloor: {
    id: 'danceFloor',
    displayName: 'Dance Floor',
    shortName: 'the dance floor',
    description: `The ping-pong table has been pushed to the side for a makeshift dance floor. Colourful skeletons raise and lower their arms to the beat of chiptune music coming from a DJ booth near the wall. The DJ smoothly transitions between old favourites and requests from years past.<br/>
    <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/511460973&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/funkip" title="Funkip ♥" target="_blank" style="color: #cccccc; text-decoration: none;">Funkip ♥</a> · <a href="https://soundcloud.com/funkip/roguelike-celebration-2018-saturday-night" title="Roguelike Celebration 2018" target="_blank" style="color: #cccccc; text-decoration: none;">Roguelike Celebration 2018</a></div><br/><iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/699462760&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/funkip" title="Funkip ♥" target="_blank" style="color: #cccccc; text-decoration: none;">Funkip ♥</a> · <a href="https://soundcloud.com/funkip/rand-gen-mem" title="💖 Roguelike Celebration 2019 Mix" target="_blank" style="color: #cccccc; text-decoration: none;">💖 Roguelike Celebration 2019 Mix</a></div><br/><br/>
    You can head back to the [[bar]].`
  },
  barBoothA: {
    id: 'barBoothA',
    displayName: 'Bar Booth A',
    shortName: 'table A in the kitchen',
    description: `A cozy booth, far enough from the bar for a smaller conversation.
      From here, you can see tables [[B->barBoothB]] or [[C->barBoothC]], and the [[rest of the bar->bar]].`
  },
  barBoothB: {
    id: 'barBoothB',
    displayName: 'Bar Booth B',
    shortName: 'table B in the kitchen',
    description: `A cozy booth, far enough from the bar for a smaller conversation.
      From here, you can see tables [[A->barBoothA]] or [[C->barBoothC]], and the [[rest of the bar->bar]].`
  },
  barBoothC: {
    id: 'barBoothC',
    displayName: 'Bar Booth C',
    shortName: 'table C in the kitchen',
    description: `A cozy booth, far enough from the bar for a smaller conversation.<br/><br/>
      From here, you can see tables [[A->barBoothA]] or [[B->barBoothB]], and the [[rest of the bar->bar]]`
  },

/*  Not deleting this yet because I want to figure out what to do with the doorways / color minigame, but it *shouldn't* link anywhere.
    foyer: {
    id: 'foyer',
    displayName: 'Haunted Foyer',
    shortName: 'the haunted foyer',
    description: `A grand opulent foyer leading into the theater. A chill runs down your spine as you walk in; something just feels <em>off</em> about this place.<br/><br/>
    You can see a [[swag table->swag]] in the corner, and can also leave to the [[theater]] or the [[west showcase hall->westShowcaseHall]].`,
    specialFeatures: [SpecialFeature.RainbowDoor, SpecialFeature.DullDoor]
  }, */

  // I think right now you can't get here. It'd be nice to turn the items into something neat, though I'm not sure the full room index 'feature' was sufficiently compelling.
  hiddenPortalRoom: {
    id: 'hiddenPortalRoom',
    displayName: 'Portal Room',
    shortName: 'the portal room',
    description: `In the center of the room is a shimmering portal. Next to the portal is a pedestal with an open book. To your right is a table with a sign hung behind it, reading "Lending Table" in flowery wizard script. On the table you can see [[a wand of digging->item]], [[a Proof of Stremf->item]], [[a pair of seven league boots->item]], and [[Planepacked->item]], the legendary limestone statue.<br/><br/>
      Once you've finished here, you can [[leap into the shimmering portal->statue]]`,
    specialFeatures: [SpecialFeature.FullRoomIndex],
    hidden: true
  }
}

export const roomData: { [name: string]: Room } = {
  ...indexRoomData,
  ...loungeDungeonRoomData
}
