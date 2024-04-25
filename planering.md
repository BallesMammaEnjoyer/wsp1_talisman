(Planering i /images) (ska nog inte göra den snarare följer jag videorna)

2024/04/11: följde första videon, gjorde ubuntu saker och sånt
problem jag löst: fått början att funka

2024/04/23 - kollade på videor.



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
