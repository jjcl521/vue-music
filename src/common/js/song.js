export class Song {
    constructor({ albumid, albummid, albumname, songid, singer }) {
        this.albumid = albumid;
        this.albummid = albummid;
        this.albumname = albumname;
        this.songid = songid;
        this.singer = singer.map(s => s.name).join("/");
    }
}

export function createSong(musicData) {
    return new Song(musicData);
}