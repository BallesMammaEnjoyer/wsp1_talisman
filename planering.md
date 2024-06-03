(Planering i /images) (ska nog inte göra den snarare följer jag videorna)

2024/04/11: följde första videon, gjorde ubuntu saker och sånt
problem jag löst: fått början att funka

2024/04/23 - kollade på videor.

2024/05/13 - jobbade med att försöka hitta ett error, det visade sig vara ett "T" i db.js som förstörde allt.

2024/05/14 - fortsätter följa videorna, fixar artist page. Går nu att lägga till mer artister samt express-validation och sånt.

2024/05/16 - Fortsätter med videorna, jobbade med CSS, börjat på delete och lite random småsaker.

2024/05/28 - gjort edit och såg klart alla videor, börjat med css och fixat knappar. La också in en bild och fixade css på den.

2024/05/29 - Gjorde klart CSS, la in mer bilder.



DB-planering:

Album - artist_id, titel, year
Artist - name

Song - album_id, titel
Review - album_id, score, text

SQL:
SELECT mille_album.*, mille_artist.name AS artist FROM mille_album JOIN mille_artist ON mille_album.artist_id = mille_artist.id 




////
game_players_characters:
id - game_id - player_id - character_id

character:
id - name - stats

player: 
id - name
