export class Song {
    constructor({ albumid, albummid, albumname, songid, singer }) {
        this.albumid = albumid;
        this.albummid = albummid;
        this.albumname = albumname;
        this.songid = songid;
        this.singer = singer.map(s => s.name).join("/");
        this.url=`https://y.qq.com/n/yqq/singer/${albummid}.html#stat=y_new.singerlist.singerpic`;
    }
}

export function createSong(musicData) {
    return new Song(musicData);
}
