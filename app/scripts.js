module.exports = {
    MP: 'if($(".btnPlay button")[0]){$(".btnPlay button").trigger("click")}',
    MS: 'if($(".btnStop button")[0]){$(".btnStop button").trigger("click")}',
    MPP: 'if($(".btnPlay button")[0]){$(".btnPlay button").trigger("click")}else{$(".btnStop button").trigger("click")}',
    MNT: '$(".btnNext button").trigger("click")',
    MPT: '$(".btnPrev button").trigger("click")'
}
