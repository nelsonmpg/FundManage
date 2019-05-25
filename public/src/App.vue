<template>
  <div>
    <router-view></router-view>
    <!-- <notifications group="notification" position="top center"/> -->
    <notifications group="notification" position="top center">
      <template slot="body" slot-scope="props">
        <b-card no-body :border-variant="props.item.type" class="bg-gray-900">
          <header class="modal-header ajust-notifications" :class="'bg-' + props.item.type">
            <h5 class="modal-title">{{props.item.title}}</h5>
          </header>
          <div class="modal-body ajust-notifications">
            <div v-html="props.item.text"></div>
          </div>
        </b-card>
      </template>
    </notifications>
    <v-loading/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
// CoreUI Icons Set
@import "~@coreui/icons/css/coreui-icons.min.css";
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Simple Line Icons Set */
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/scss/simple-line-icons.scss";
/* Import Flag Icons Set */
@import "~flag-icon-css/css/flag-icon.min.css";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
// Import Main styles for this application
@import "assets/scss/style";

.ajust-notifications {
  padding-top: 0.5rem;
  padding-bottom: 0.6rem;
}

.fa-border {
  border: 0.08em solid #eee;
  border-radius: 0.1em;
}

.fa-inverse {
  color: #fff;
}

.fa-glass:before {
  content: "\F000";
}

.fa-music:before {
  content: "\F001";
}

.fa-search:before {
  content: "\F002";
}

.fa-envelope-o:before {
  content: "\F003";
}

.fa-heart:before {
  content: "\F004";
}

.fa-star:before {
  content: "\F005";
}

.fa-star-o:before {
  content: "\F006";
}

.fa-user:before {
  content: "\F007";
}

.fa-film:before {
  content: "\F008";
}

.fa-th-large:before {
  content: "\F009";
}

.fa-th:before {
  content: "\F00A";
}

.fa-th-list:before {
  content: "\F00B";
}

.fa-check:before {
  content: "\F00C";
}

.fa-close:before,
.fa-remove:before,
.fa-times:before {
  content: "\F00D";
}

.fa-search-plus:before {
  content: "\F00E";
}

.fa-search-minus:before {
  content: "\F010";
}

.fa-power-off:before {
  content: "\F011";
}

.fa-signal:before {
  content: "\F012";
}

.fa-cog:before,
.fa-gear:before {
  content: "\F013";
}

.fa-trash-o:before {
  content: "\F014";
}

.fa-home:before {
  content: "\F015";
}

.fa-file-o:before {
  content: "\F016";
}

.fa-clock-o:before {
  content: "\F017";
}

.fa-road:before {
  content: "\F018";
}

.fa-download:before {
  content: "\F019";
}

.fa-arrow-circle-o-down:before {
  content: "\F01A";
}

.fa-arrow-circle-o-up:before {
  content: "\F01B";
}

.fa-inbox:before {
  content: "\F01C";
}

.fa-play-circle-o:before {
  content: "\F01D";
}

.fa-repeat:before,
.fa-rotate-right:before {
  content: "\F01E";
}

.fa-refresh:before {
  content: "\F021";
}

.fa-list-alt:before {
  content: "\F022";
}

.fa-lock:before {
  content: "\F023";
}

.fa-flag:before {
  content: "\F024";
}

.fa-headphones:before {
  content: "\F025";
}

.fa-volume-off:before {
  content: "\F026";
}

.fa-volume-down:before {
  content: "\F027";
}

.fa-volume-up:before {
  content: "\F028";
}

.fa-qrcode:before {
  content: "\F029";
}

.fa-barcode:before {
  content: "\F02A";
}

.fa-tag:before {
  content: "\F02B";
}

.fa-tags:before {
  content: "\F02C";
}

.fa-book:before {
  content: "\F02D";
}

.fa-bookmark:before {
  content: "\F02E";
}

.fa-print:before {
  content: "\F02F";
}

.fa-camera:before {
  content: "\F030";
}

.fa-font:before {
  content: "\F031";
}

.fa-bold:before {
  content: "\F032";
}

.fa-italic:before {
  content: "\F033";
}

.fa-text-height:before {
  content: "\F034";
}

.fa-text-width:before {
  content: "\F035";
}

.fa-align-left:before {
  content: "\F036";
}

.fa-align-center:before {
  content: "\F037";
}

.fa-align-right:before {
  content: "\F038";
}

.fa-align-justify:before {
  content: "\F039";
}

.fa-list:before {
  content: "\F03A";
}

.fa-dedent:before,
.fa-outdent:before {
  content: "\F03B";
}

.fa-indent:before {
  content: "\F03C";
}

.fa-video-camera:before {
  content: "\F03D";
}

.fa-image:before,
.fa-photo:before,
.fa-picture-o:before {
  content: "\F03E";
}

.fa-pencil:before {
  content: "\F040";
}

.fa-map-marker:before {
  content: "\F041";
}

.fa-adjust:before {
  content: "\F042";
}

.fa-tint:before {
  content: "\F043";
}

.fa-edit:before,
.fa-pencil-square-o:before {
  content: "\F044";
}

.fa-share-square-o:before {
  content: "\F045";
}

.fa-check-square-o:before {
  content: "\F046";
}

.fa-arrows:before {
  content: "\F047";
}

.fa-step-backward:before {
  content: "\F048";
}

.fa-fast-backward:before {
  content: "\F049";
}

.fa-backward:before {
  content: "\F04A";
}

.fa-play:before {
  content: "\F04B";
}

.fa-pause:before {
  content: "\F04C";
}

.fa-stop:before {
  content: "\F04D";
}

.fa-forward:before {
  content: "\F04E";
}

.fa-fast-forward:before {
  content: "\F050";
}

.fa-step-forward:before {
  content: "\F051";
}

.fa-eject:before {
  content: "\F052";
}

.fa-chevron-left:before {
  content: "\F053";
}

.fa-chevron-right:before {
  content: "\F054";
}

.fa-plus-circle:before {
  content: "\F055";
}

.fa-minus-circle:before {
  content: "\F056";
}

.fa-times-circle:before {
  content: "\F057";
}

.fa-check-circle:before {
  content: "\F058";
}

.fa-question-circle:before {
  content: "\F059";
}

.fa-info-circle:before {
  content: "\F05A";
}

.fa-crosshairs:before {
  content: "\F05B";
}

.fa-times-circle-o:before {
  content: "\F05C";
}

.fa-check-circle-o:before {
  content: "\F05D";
}

.fa-ban:before {
  content: "\F05E";
}

.fa-arrow-left:before {
  content: "\F060";
}

.fa-arrow-right:before {
  content: "\F061";
}

.fa-arrow-up:before {
  content: "\F062";
}

.fa-arrow-down:before {
  content: "\F063";
}

.fa-mail-forward:before,
.fa-share:before {
  content: "\F064";
}

.fa-expand:before {
  content: "\F065";
}

.fa-compress:before {
  content: "\F066";
}

.fa-plus:before {
  content: "\F067";
}

.fa-minus:before {
  content: "\F068";
}

.fa-asterisk:before {
  content: "\F069";
}

.fa-exclamation-circle:before {
  content: "\F06A";
}

.fa-gift:before {
  content: "\F06B";
}

.fa-leaf:before {
  content: "\F06C";
}

.fa-fire:before {
  content: "\F06D";
}

.fa-eye:before {
  content: "\F06E";
}

.fa-eye-slash:before {
  content: "\F070";
}

.fa-exclamation-triangle:before,
.fa-warning:before {
  content: "\F071";
}

.fa-plane:before {
  content: "\F072";
}

.fa-calendar:before {
  content: "\F073";
}

.fa-random:before {
  content: "\F074";
}

.fa-comment:before {
  content: "\F075";
}

.fa-magnet:before {
  content: "\F076";
}

.fa-chevron-up:before {
  content: "\F077";
}

.fa-chevron-down:before {
  content: "\F078";
}

.fa-retweet:before {
  content: "\F079";
}

.fa-shopping-cart:before {
  content: "\F07A";
}

.fa-folder:before {
  content: "\F07B";
}

.fa-folder-open:before {
  content: "\F07C";
}

.fa-arrows-v:before {
  content: "\F07D";
}

.fa-arrows-h:before {
  content: "\F07E";
}

.fa-bar-chart-o:before,
.fa-bar-chart:before {
  content: "\F080";
}

.fa-twitter-square:before {
  content: "\F081";
}

.fa-facebook-square:before {
  content: "\F082";
}

.fa-camera-retro:before {
  content: "\F083";
}

.fa-key:before {
  content: "\F084";
}

.fa-cogs:before,
.fa-gears:before {
  content: "\F085";
}

.fa-comments:before {
  content: "\F086";
}

.fa-thumbs-o-up:before {
  content: "\F087";
}

.fa-thumbs-o-down:before {
  content: "\F088";
}

.fa-star-half:before {
  content: "\F089";
}

.fa-heart-o:before {
  content: "\F08A";
}

.fa-sign-out:before {
  content: "\F08B";
}

.fa-linkedin-square:before {
  content: "\F08C";
}

.fa-thumb-tack:before {
  content: "\F08D";
}

.fa-external-link:before {
  content: "\F08E";
}

.fa-sign-in:before {
  content: "\F090";
}

.fa-trophy:before {
  content: "\F091";
}

.fa-github-square:before {
  content: "\F092";
}

.fa-upload:before {
  content: "\F093";
}

.fa-lemon-o:before {
  content: "\F094";
}

.fa-phone:before {
  content: "\F095";
}

.fa-square-o:before {
  content: "\F096";
}

.fa-bookmark-o:before {
  content: "\F097";
}

.fa-phone-square:before {
  content: "\F098";
}

.fa-twitter:before {
  content: "\F099";
}

.fa-facebook-f:before,
.fa-facebook:before {
  content: "\F09A";
}

.fa-github:before {
  content: "\F09B";
}

.fa-unlock:before {
  content: "\F09C";
}

.fa-credit-card:before {
  content: "\F09D";
}

.fa-feed:before,
.fa-rss:before {
  content: "\F09E";
}

.fa-hdd-o:before {
  content: "\F0A0";
}

.fa-bullhorn:before {
  content: "\F0A1";
}

.fa-bell:before {
  content: "\F0F3";
}

.fa-certificate:before {
  content: "\F0A3";
}

.fa-hand-o-right:before {
  content: "\F0A4";
}

.fa-hand-o-left:before {
  content: "\F0A5";
}

.fa-hand-o-up:before {
  content: "\F0A6";
}

.fa-hand-o-down:before {
  content: "\F0A7";
}

.fa-arrow-circle-left:before {
  content: "\F0A8";
}

.fa-arrow-circle-right:before {
  content: "\F0A9";
}

.fa-arrow-circle-up:before {
  content: "\F0AA";
}

.fa-arrow-circle-down:before {
  content: "\F0AB";
}

.fa-globe:before {
  content: "\F0AC";
}

.fa-wrench:before {
  content: "\F0AD";
}

.fa-tasks:before {
  content: "\F0AE";
}

.fa-filter:before {
  content: "\F0B0";
}

.fa-briefcase:before {
  content: "\F0B1";
}

.fa-arrows-alt:before {
  content: "\F0B2";
}

.fa-group:before,
.fa-users:before {
  content: "\F0C0";
}

.fa-chain:before,
.fa-link:before {
  content: "\F0C1";
}

.fa-cloud:before {
  content: "\F0C2";
}

.fa-flask:before {
  content: "\F0C3";
}

.fa-cut:before,
.fa-scissors:before {
  content: "\F0C4";
}

.fa-copy:before,
.fa-files-o:before {
  content: "\F0C5";
}

.fa-paperclip:before {
  content: "\F0C6";
}

.fa-floppy-o:before,
.fa-save:before {
  content: "\F0C7";
}

.fa-square:before {
  content: "\F0C8";
}

.fa-bars:before,
.fa-navicon:before,
.fa-reorder:before {
  content: "\F0C9";
}

.fa-list-ul:before {
  content: "\F0CA";
}

.fa-list-ol:before {
  content: "\F0CB";
}

.fa-strikethrough:before {
  content: "\F0CC";
}

.fa-underline:before {
  content: "\F0CD";
}

.fa-table:before {
  content: "\F0CE";
}

.fa-magic:before {
  content: "\F0D0";
}

.fa-truck:before {
  content: "\F0D1";
}

.fa-pinterest:before {
  content: "\F0D2";
}

.fa-pinterest-square:before {
  content: "\F0D3";
}

.fa-google-plus-square:before {
  content: "\F0D4";
}

.fa-google-plus:before {
  content: "\F0D5";
}

.fa-money:before {
  content: "\F0D6";
}

.fa-caret-down:before {
  content: "\F0D7";
}

.fa-caret-up:before {
  content: "\F0D8";
}

.fa-caret-left:before {
  content: "\F0D9";
}

.fa-caret-right:before {
  content: "\F0DA";
}

.fa-columns:before {
  content: "\F0DB";
}

.fa-sort:before,
.fa-unsorted:before {
  content: "\F0DC";
}

.fa-sort-desc:before,
.fa-sort-down:before {
  content: "\F0DD";
}

.fa-sort-asc:before,
.fa-sort-up:before {
  content: "\F0DE";
}

.fa-envelope:before {
  content: "\F0E0";
}

.fa-linkedin:before {
  content: "\F0E1";
}

.fa-rotate-left:before,
.fa-undo:before {
  content: "\F0E2";
}

.fa-gavel:before,
.fa-legal:before {
  content: "\F0E3";
}

.fa-dashboard:before,
.fa-tachometer:before {
  content: "\F0E4";
}

.fa-comment-o:before {
  content: "\F0E5";
}

.fa-comments-o:before {
  content: "\F0E6";
}

.fa-bolt:before,
.fa-flash:before {
  content: "\F0E7";
}

.fa-sitemap:before {
  content: "\F0E8";
}

.fa-umbrella:before {
  content: "\F0E9";
}

.fa-clipboard:before,
.fa-paste:before {
  content: "\F0EA";
}

.fa-lightbulb-o:before {
  content: "\F0EB";
}

.fa-exchange:before {
  content: "\F0EC";
}

.fa-cloud-download:before {
  content: "\F0ED";
}

.fa-cloud-upload:before {
  content: "\F0EE";
}

.fa-user-md:before {
  content: "\F0F0";
}

.fa-stethoscope:before {
  content: "\F0F1";
}

.fa-suitcase:before {
  content: "\F0F2";
}

.fa-bell-o:before {
  content: "\F0A2";
}

.fa-coffee:before {
  content: "\F0F4";
}

.fa-cutlery:before {
  content: "\F0F5";
}

.fa-file-text-o:before {
  content: "\F0F6";
}

.fa-building-o:before {
  content: "\F0F7";
}

.fa-hospital-o:before {
  content: "\F0F8";
}

.fa-ambulance:before {
  content: "\F0F9";
}

.fa-medkit:before {
  content: "\F0FA";
}

.fa-fighter-jet:before {
  content: "\F0FB";
}

.fa-beer:before {
  content: "\F0FC";
}

.fa-h-square:before {
  content: "\F0FD";
}

.fa-plus-square:before {
  content: "\F0FE";
}

.fa-angle-double-left:before {
  content: "\F100";
}

.fa-angle-double-right:before {
  content: "\F101";
}

.fa-angle-double-up:before {
  content: "\F102";
}

.fa-angle-double-down:before {
  content: "\F103";
}

.fa-angle-left:before {
  content: "\F104";
}

.fa-angle-right:before {
  content: "\F105";
}

.fa-angle-up:before {
  content: "\F106";
}

.fa-angle-down:before {
  content: "\F107";
}

.fa-desktop:before {
  content: "\F108";
}

.fa-laptop:before {
  content: "\F109";
}

.fa-tablet:before {
  content: "\F10A";
}

.fa-mobile-phone:before,
.fa-mobile:before {
  content: "\F10B";
}

.fa-circle-o:before {
  content: "\F10C";
}

.fa-quote-left:before {
  content: "\F10D";
}

.fa-quote-right:before {
  content: "\F10E";
}

.fa-spinner:before {
  content: "\F110";
}

.fa-circle:before {
  content: "\F111";
}

.fa-mail-reply:before,
.fa-reply:before {
  content: "\F112";
}

.fa-github-alt:before {
  content: "\F113";
}

.fa-folder-o:before {
  content: "\F114";
}

.fa-folder-open-o:before {
  content: "\F115";
}

.fa-smile-o:before {
  content: "\F118";
}

.fa-frown-o:before {
  content: "\F119";
}

.fa-meh-o:before {
  content: "\F11A";
}

.fa-gamepad:before {
  content: "\F11B";
}

.fa-keyboard-o:before {
  content: "\F11C";
}

.fa-flag-o:before {
  content: "\F11D";
}

.fa-flag-checkered:before {
  content: "\F11E";
}

.fa-terminal:before {
  content: "\F120";
}

.fa-code:before {
  content: "\F121";
}

.fa-mail-reply-all:before,
.fa-reply-all:before {
  content: "\F122";
}

.fa-star-half-empty:before,
.fa-star-half-full:before,
.fa-star-half-o:before {
  content: "\F123";
}

.fa-location-arrow:before {
  content: "\F124";
}

.fa-crop:before {
  content: "\F125";
}

.fa-code-fork:before {
  content: "\F126";
}

.fa-chain-broken:before,
.fa-unlink:before {
  content: "\F127";
}

.fa-question:before {
  content: "\F128";
}

.fa-info:before {
  content: "\F129";
}

.fa-exclamation:before {
  content: "\F12A";
}

.fa-superscript:before {
  content: "\F12B";
}

.fa-subscript:before {
  content: "\F12C";
}

.fa-eraser:before {
  content: "\F12D";
}

.fa-puzzle-piece:before {
  content: "\F12E";
}

.fa-microphone:before {
  content: "\F130";
}

.fa-microphone-slash:before {
  content: "\F131";
}

.fa-shield:before {
  content: "\F132";
}

.fa-calendar-o:before {
  content: "\F133";
}

.fa-fire-extinguisher:before {
  content: "\F134";
}

.fa-rocket:before {
  content: "\F135";
}

.fa-maxcdn:before {
  content: "\F136";
}

.fa-chevron-circle-left:before {
  content: "\F137";
}

.fa-chevron-circle-right:before {
  content: "\F138";
}

.fa-chevron-circle-up:before {
  content: "\F139";
}

.fa-chevron-circle-down:before {
  content: "\F13A";
}

.fa-html5:before {
  content: "\F13B";
}

.fa-css3:before {
  content: "\F13C";
}

.fa-anchor:before {
  content: "\F13D";
}

.fa-unlock-alt:before {
  content: "\F13E";
}

.fa-bullseye:before {
  content: "\F140";
}

.fa-ellipsis-h:before {
  content: "\F141";
}

.fa-ellipsis-v:before {
  content: "\F142";
}

.fa-rss-square:before {
  content: "\F143";
}

.fa-play-circle:before {
  content: "\F144";
}

.fa-ticket:before {
  content: "\F145";
}

.fa-minus-square:before {
  content: "\F146";
}

.fa-minus-square-o:before {
  content: "\F147";
}

.fa-level-up:before {
  content: "\F148";
}

.fa-level-down:before {
  content: "\F149";
}

.fa-check-square:before {
  content: "\F14A";
}

.fa-pencil-square:before {
  content: "\F14B";
}

.fa-external-link-square:before {
  content: "\F14C";
}

.fa-share-square:before {
  content: "\F14D";
}

.fa-compass:before {
  content: "\F14E";
}

.fa-caret-square-o-down:before,
.fa-toggle-down:before {
  content: "\F150";
}

.fa-caret-square-o-up:before,
.fa-toggle-up:before {
  content: "\F151";
}

.fa-caret-square-o-right:before,
.fa-toggle-right:before {
  content: "\F152";
}

.fa-eur:before,
.fa-euro:before {
  content: "\F153";
}

.fa-gbp:before {
  content: "\F154";
}

.fa-dollar:before,
.fa-usd:before {
  content: "\F155";
}

.fa-inr:before,
.fa-rupee:before {
  content: "\F156";
}

.fa-cny:before,
.fa-jpy:before,
.fa-rmb:before,
.fa-yen:before {
  content: "\F157";
}

.fa-rouble:before,
.fa-rub:before,
.fa-ruble:before {
  content: "\F158";
}

.fa-krw:before,
.fa-won:before {
  content: "\F159";
}

.fa-bitcoin:before,
.fa-btc:before {
  content: "\F15A";
}

.fa-file:before {
  content: "\F15B";
}

.fa-file-text:before {
  content: "\F15C";
}

.fa-sort-alpha-asc:before {
  content: "\F15D";
}

.fa-sort-alpha-desc:before {
  content: "\F15E";
}

.fa-sort-amount-asc:before {
  content: "\F160";
}

.fa-sort-amount-desc:before {
  content: "\F161";
}

.fa-sort-numeric-asc:before {
  content: "\F162";
}

.fa-sort-numeric-desc:before {
  content: "\F163";
}

.fa-thumbs-up:before {
  content: "\F164";
}

.fa-thumbs-down:before {
  content: "\F165";
}

.fa-youtube-square:before {
  content: "\F166";
}

.fa-youtube:before {
  content: "\F167";
}

.fa-xing:before {
  content: "\F168";
}

.fa-xing-square:before {
  content: "\F169";
}

.fa-youtube-play:before {
  content: "\F16A";
}

.fa-dropbox:before {
  content: "\F16B";
}

.fa-stack-overflow:before {
  content: "\F16C";
}

.fa-instagram:before {
  content: "\F16D";
}

.fa-flickr:before {
  content: "\F16E";
}

.fa-adn:before {
  content: "\F170";
}

.fa-bitbucket:before {
  content: "\F171";
}

.fa-bitbucket-square:before {
  content: "\F172";
}

.fa-tumblr:before {
  content: "\F173";
}

.fa-tumblr-square:before {
  content: "\F174";
}

.fa-long-arrow-down:before {
  content: "\F175";
}

.fa-long-arrow-up:before {
  content: "\F176";
}

.fa-long-arrow-left:before {
  content: "\F177";
}

.fa-long-arrow-right:before {
  content: "\F178";
}

.fa-apple:before {
  content: "\F179";
}

.fa-windows:before {
  content: "\F17A";
}

.fa-android:before {
  content: "\F17B";
}

.fa-linux:before {
  content: "\F17C";
}

.fa-dribbble:before {
  content: "\F17D";
}

.fa-skype:before {
  content: "\F17E";
}

.fa-foursquare:before {
  content: "\F180";
}

.fa-trello:before {
  content: "\F181";
}

.fa-female:before {
  content: "\F182";
}

.fa-male:before {
  content: "\F183";
}

.fa-gittip:before,
.fa-gratipay:before {
  content: "\F184";
}

.fa-sun-o:before {
  content: "\F185";
}

.fa-moon-o:before {
  content: "\F186";
}

.fa-archive:before {
  content: "\F187";
}

.fa-bug:before {
  content: "\F188";
}

.fa-vk:before {
  content: "\F189";
}

.fa-weibo:before {
  content: "\F18A";
}

.fa-renren:before {
  content: "\F18B";
}

.fa-pagelines:before {
  content: "\F18C";
}

.fa-stack-exchange:before {
  content: "\F18D";
}

.fa-arrow-circle-o-right:before {
  content: "\F18E";
}

.fa-arrow-circle-o-left:before {
  content: "\F190";
}

.fa-caret-square-o-left:before,
.fa-toggle-left:before {
  content: "\F191";
}

.fa-dot-circle-o:before {
  content: "\F192";
}

.fa-wheelchair:before {
  content: "\F193";
}

.fa-vimeo-square:before {
  content: "\F194";
}

.fa-try:before,
.fa-turkish-lira:before {
  content: "\F195";
}

.fa-plus-square-o:before {
  content: "\F196";
}

.fa-space-shuttle:before {
  content: "\F197";
}

.fa-slack:before {
  content: "\F198";
}

.fa-envelope-square:before {
  content: "\F199";
}

.fa-wordpress:before {
  content: "\F19A";
}

.fa-openid:before {
  content: "\F19B";
}

.fa-bank:before,
.fa-institution:before,
.fa-university:before {
  content: "\F19C";
}

.fa-graduation-cap:before,
.fa-mortar-board:before {
  content: "\F19D";
}

.fa-yahoo:before {
  content: "\F19E";
}

.fa-google:before {
  content: "\F1A0";
}

.fa-reddit:before {
  content: "\F1A1";
}

.fa-reddit-square:before {
  content: "\F1A2";
}

.fa-stumbleupon-circle:before {
  content: "\F1A3";
}

.fa-stumbleupon:before {
  content: "\F1A4";
}

.fa-delicious:before {
  content: "\F1A5";
}

.fa-digg:before {
  content: "\F1A6";
}

.fa-pied-piper-pp:before {
  content: "\F1A7";
}

.fa-pied-piper-alt:before {
  content: "\F1A8";
}

.fa-drupal:before {
  content: "\F1A9";
}

.fa-joomla:before {
  content: "\F1AA";
}

.fa-language:before {
  content: "\F1AB";
}

.fa-fax:before {
  content: "\F1AC";
}

.fa-building:before {
  content: "\F1AD";
}

.fa-child:before {
  content: "\F1AE";
}

.fa-paw:before {
  content: "\F1B0";
}

.fa-spoon:before {
  content: "\F1B1";
}

.fa-cube:before {
  content: "\F1B2";
}

.fa-cubes:before {
  content: "\F1B3";
}

.fa-behance:before {
  content: "\F1B4";
}

.fa-behance-square:before {
  content: "\F1B5";
}

.fa-steam:before {
  content: "\F1B6";
}

.fa-steam-square:before {
  content: "\F1B7";
}

.fa-recycle:before {
  content: "\F1B8";
}

.fa-automobile:before,
.fa-car:before {
  content: "\F1B9";
}

.fa-cab:before,
.fa-taxi:before {
  content: "\F1BA";
}

.fa-tree:before {
  content: "\F1BB";
}

.fa-spotify:before {
  content: "\F1BC";
}

.fa-deviantart:before {
  content: "\F1BD";
}

.fa-soundcloud:before {
  content: "\F1BE";
}

.fa-database:before {
  content: "\F1C0";
}

.fa-file-pdf-o:before {
  content: "\F1C1";
}

.fa-file-word-o:before {
  content: "\F1C2";
}

.fa-file-excel-o:before {
  content: "\F1C3";
}

.fa-file-powerpoint-o:before {
  content: "\F1C4";
}

.fa-file-image-o:before,
.fa-file-photo-o:before,
.fa-file-picture-o:before {
  content: "\F1C5";
}

.fa-file-archive-o:before,
.fa-file-zip-o:before {
  content: "\F1C6";
}

.fa-file-audio-o:before,
.fa-file-sound-o:before {
  content: "\F1C7";
}

.fa-file-movie-o:before,
.fa-file-video-o:before {
  content: "\F1C8";
}

.fa-file-code-o:before {
  content: "\F1C9";
}

.fa-vine:before {
  content: "\F1CA";
}

.fa-codepen:before {
  content: "\F1CB";
}

.fa-jsfiddle:before {
  content: "\F1CC";
}

.fa-life-bouy:before,
.fa-life-buoy:before,
.fa-life-ring:before,
.fa-life-saver:before,
.fa-support:before {
  content: "\F1CD";
}

.fa-circle-o-notch:before {
  content: "\F1CE";
}

.fa-ra:before,
.fa-rebel:before,
.fa-resistance:before {
  content: "\F1D0";
}

.fa-empire:before,
.fa-ge:before {
  content: "\F1D1";
}

.fa-git-square:before {
  content: "\F1D2";
}

.fa-git:before {
  content: "\F1D3";
}

.fa-hacker-news:before,
.fa-y-combinator-square:before,
.fa-yc-square:before {
  content: "\F1D4";
}

.fa-tencent-weibo:before {
  content: "\F1D5";
}

.fa-qq:before {
  content: "\F1D6";
}

.fa-wechat:before,
.fa-weixin:before {
  content: "\F1D7";
}

.fa-paper-plane:before,
.fa-send:before {
  content: "\F1D8";
}

.fa-paper-plane-o:before,
.fa-send-o:before {
  content: "\F1D9";
}

.fa-history:before {
  content: "\F1DA";
}

.fa-circle-thin:before {
  content: "\F1DB";
}

.fa-header:before {
  content: "\F1DC";
}

.fa-paragraph:before {
  content: "\F1DD";
}

.fa-sliders:before {
  content: "\F1DE";
}

.fa-share-alt:before {
  content: "\F1E0";
}

.fa-share-alt-square:before {
  content: "\F1E1";
}

.fa-bomb:before {
  content: "\F1E2";
}

.fa-futbol-o:before,
.fa-soccer-ball-o:before {
  content: "\F1E3";
}

.fa-tty:before {
  content: "\F1E4";
}

.fa-binoculars:before {
  content: "\F1E5";
}

.fa-plug:before {
  content: "\F1E6";
}

.fa-slideshare:before {
  content: "\F1E7";
}

.fa-twitch:before {
  content: "\F1E8";
}

.fa-yelp:before {
  content: "\F1E9";
}

.fa-newspaper-o:before {
  content: "\F1EA";
}

.fa-wifi:before {
  content: "\F1EB";
}

.fa-calculator:before {
  content: "\F1EC";
}

.fa-paypal:before {
  content: "\F1ED";
}

.fa-google-wallet:before {
  content: "\F1EE";
}

.fa-cc-visa:before {
  content: "\F1F0";
}

.fa-cc-mastercard:before {
  content: "\F1F1";
}

.fa-cc-discover:before {
  content: "\F1F2";
}

.fa-cc-amex:before {
  content: "\F1F3";
}

.fa-cc-paypal:before {
  content: "\F1F4";
}

.fa-cc-stripe:before {
  content: "\F1F5";
}

.fa-bell-slash:before {
  content: "\F1F6";
}

.fa-bell-slash-o:before {
  content: "\F1F7";
}

.fa-trash:before {
  content: "\F1F8";
}

.fa-copyright:before {
  content: "\F1F9";
}

.fa-at:before {
  content: "\F1FA";
}

.fa-eyedropper:before {
  content: "\F1FB";
}

.fa-paint-brush:before {
  content: "\F1FC";
}

.fa-birthday-cake:before {
  content: "\F1FD";
}

.fa-area-chart:before {
  content: "\F1FE";
}

.fa-pie-chart:before {
  content: "\F200";
}

.fa-line-chart:before {
  content: "\F201";
}

.fa-lastfm:before {
  content: "\F202";
}

.fa-lastfm-square:before {
  content: "\F203";
}

.fa-toggle-off:before {
  content: "\F204";
}

.fa-toggle-on:before {
  content: "\F205";
}

.fa-bicycle:before {
  content: "\F206";
}

.fa-bus:before {
  content: "\F207";
}

.fa-ioxhost:before {
  content: "\F208";
}

.fa-angellist:before {
  content: "\F209";
}

.fa-cc:before {
  content: "\F20A";
}

.fa-ils:before,
.fa-shekel:before,
.fa-sheqel:before {
  content: "\F20B";
}

.fa-meanpath:before {
  content: "\F20C";
}

.fa-buysellads:before {
  content: "\F20D";
}

.fa-connectdevelop:before {
  content: "\F20E";
}

.fa-dashcube:before {
  content: "\F210";
}

.fa-forumbee:before {
  content: "\F211";
}

.fa-leanpub:before {
  content: "\F212";
}

.fa-sellsy:before {
  content: "\F213";
}

.fa-shirtsinbulk:before {
  content: "\F214";
}

.fa-simplybuilt:before {
  content: "\F215";
}

.fa-skyatlas:before {
  content: "\F216";
}

.fa-cart-plus:before {
  content: "\F217";
}

.fa-cart-arrow-down:before {
  content: "\F218";
}

.fa-diamond:before {
  content: "\F219";
}

.fa-ship:before {
  content: "\F21A";
}

.fa-user-secret:before {
  content: "\F21B";
}

.fa-motorcycle:before {
  content: "\F21C";
}

.fa-street-view:before {
  content: "\F21D";
}

.fa-heartbeat:before {
  content: "\F21E";
}

.fa-venus:before {
  content: "\F221";
}

.fa-mars:before {
  content: "\F222";
}

.fa-mercury:before {
  content: "\F223";
}

.fa-intersex:before,
.fa-transgender:before {
  content: "\F224";
}

.fa-transgender-alt:before {
  content: "\F225";
}

.fa-venus-double:before {
  content: "\F226";
}

.fa-mars-double:before {
  content: "\F227";
}

.fa-venus-mars:before {
  content: "\F228";
}

.fa-mars-stroke:before {
  content: "\F229";
}

.fa-mars-stroke-v:before {
  content: "\F22A";
}

.fa-mars-stroke-h:before {
  content: "\F22B";
}

.fa-neuter:before {
  content: "\F22C";
}

.fa-genderless:before {
  content: "\F22D";
}

.fa-facebook-official:before {
  content: "\F230";
}

.fa-pinterest-p:before {
  content: "\F231";
}

.fa-whatsapp:before {
  content: "\F232";
}

.fa-server:before {
  content: "\F233";
}

.fa-user-plus:before {
  content: "\F234";
}

.fa-user-times:before {
  content: "\F235";
}

.fa-bed:before,
.fa-hotel:before {
  content: "\F236";
}

.fa-viacoin:before {
  content: "\F237";
}

.fa-train:before {
  content: "\F238";
}

.fa-subway:before {
  content: "\F239";
}

.fa-medium:before {
  content: "\F23A";
}

.fa-y-combinator:before,
.fa-yc:before {
  content: "\F23B";
}

.fa-optin-monster:before {
  content: "\F23C";
}

.fa-opencart:before {
  content: "\F23D";
}

.fa-expeditedssl:before {
  content: "\F23E";
}

.fa-battery-4:before,
.fa-battery-full:before,
.fa-battery:before {
  content: "\F240";
}

.fa-battery-3:before,
.fa-battery-three-quarters:before {
  content: "\F241";
}

.fa-battery-2:before,
.fa-battery-half:before {
  content: "\F242";
}

.fa-battery-1:before,
.fa-battery-quarter:before {
  content: "\F243";
}

.fa-battery-0:before,
.fa-battery-empty:before {
  content: "\F244";
}

.fa-mouse-pointer:before {
  content: "\F245";
}

.fa-i-cursor:before {
  content: "\F246";
}

.fa-object-group:before {
  content: "\F247";
}

.fa-object-ungroup:before {
  content: "\F248";
}

.fa-sticky-note:before {
  content: "\F249";
}

.fa-sticky-note-o:before {
  content: "\F24A";
}

.fa-cc-jcb:before {
  content: "\F24B";
}

.fa-cc-diners-club:before {
  content: "\F24C";
}

.fa-clone:before {
  content: "\F24D";
}

.fa-balance-scale:before {
  content: "\F24E";
}

.fa-hourglass-o:before {
  content: "\F250";
}

.fa-hourglass-1:before,
.fa-hourglass-start:before {
  content: "\F251";
}

.fa-hourglass-2:before,
.fa-hourglass-half:before {
  content: "\F252";
}

.fa-hourglass-3:before,
.fa-hourglass-end:before {
  content: "\F253";
}

.fa-hourglass:before {
  content: "\F254";
}

.fa-hand-grab-o:before,
.fa-hand-rock-o:before {
  content: "\F255";
}

.fa-hand-paper-o:before,
.fa-hand-stop-o:before {
  content: "\F256";
}

.fa-hand-scissors-o:before {
  content: "\F257";
}

.fa-hand-lizard-o:before {
  content: "\F258";
}

.fa-hand-spock-o:before {
  content: "\F259";
}

.fa-hand-pointer-o:before {
  content: "\F25A";
}

.fa-hand-peace-o:before {
  content: "\F25B";
}

.fa-trademark:before {
  content: "\F25C";
}

.fa-registered:before {
  content: "\F25D";
}

.fa-creative-commons:before {
  content: "\F25E";
}

.fa-gg:before {
  content: "\F260";
}

.fa-gg-circle:before {
  content: "\F261";
}

.fa-tripadvisor:before {
  content: "\F262";
}

.fa-odnoklassniki:before {
  content: "\F263";
}

.fa-odnoklassniki-square:before {
  content: "\F264";
}

.fa-get-pocket:before {
  content: "\F265";
}

.fa-wikipedia-w:before {
  content: "\F266";
}

.fa-safari:before {
  content: "\F267";
}

.fa-chrome:before {
  content: "\F268";
}

.fa-firefox:before {
  content: "\F269";
}

.fa-opera:before {
  content: "\F26A";
}

.fa-internet-explorer:before {
  content: "\F26B";
}

.fa-television:before,
.fa-tv:before {
  content: "\F26C";
}

.fa-contao:before {
  content: "\F26D";
}

.fa-500px:before {
  content: "\F26E";
}

.fa-amazon:before {
  content: "\F270";
}

.fa-calendar-plus-o:before {
  content: "\F271";
}

.fa-calendar-minus-o:before {
  content: "\F272";
}

.fa-calendar-times-o:before {
  content: "\F273";
}

.fa-calendar-check-o:before {
  content: "\F274";
}

.fa-industry:before {
  content: "\F275";
}

.fa-map-pin:before {
  content: "\F276";
}

.fa-map-signs:before {
  content: "\F277";
}

.fa-map-o:before {
  content: "\F278";
}

.fa-map:before {
  content: "\F279";
}

.fa-commenting:before {
  content: "\F27A";
}

.fa-commenting-o:before {
  content: "\F27B";
}

.fa-houzz:before {
  content: "\F27C";
}

.fa-vimeo:before {
  content: "\F27D";
}

.fa-black-tie:before {
  content: "\F27E";
}

.fa-fonticons:before {
  content: "\F280";
}

.fa-reddit-alien:before {
  content: "\F281";
}

.fa-edge:before {
  content: "\F282";
}

.fa-credit-card-alt:before {
  content: "\F283";
}

.fa-codiepie:before {
  content: "\F284";
}

.fa-modx:before {
  content: "\F285";
}

.fa-fort-awesome:before {
  content: "\F286";
}

.fa-usb:before {
  content: "\F287";
}

.fa-product-hunt:before {
  content: "\F288";
}

.fa-mixcloud:before {
  content: "\F289";
}

.fa-scribd:before {
  content: "\F28A";
}

.fa-pause-circle:before {
  content: "\F28B";
}

.fa-pause-circle-o:before {
  content: "\F28C";
}

.fa-stop-circle:before {
  content: "\F28D";
}

.fa-stop-circle-o:before {
  content: "\F28E";
}

.fa-shopping-bag:before {
  content: "\F290";
}

.fa-shopping-basket:before {
  content: "\F291";
}

.fa-hashtag:before {
  content: "\F292";
}

.fa-bluetooth:before {
  content: "\F293";
}

.fa-bluetooth-b:before {
  content: "\F294";
}

.fa-percent:before {
  content: "\F295";
}

.fa-gitlab:before {
  content: "\F296";
}

.fa-wpbeginner:before {
  content: "\F297";
}

.fa-wpforms:before {
  content: "\F298";
}

.fa-envira:before {
  content: "\F299";
}

.fa-universal-access:before {
  content: "\F29A";
}

.fa-wheelchair-alt:before {
  content: "\F29B";
}

.fa-question-circle-o:before {
  content: "\F29C";
}

.fa-blind:before {
  content: "\F29D";
}

.fa-audio-description:before {
  content: "\F29E";
}

.fa-volume-control-phone:before {
  content: "\F2A0";
}

.fa-braille:before {
  content: "\F2A1";
}

.fa-assistive-listening-systems:before {
  content: "\F2A2";
}

.fa-american-sign-language-interpreting:before,
.fa-asl-interpreting:before {
  content: "\F2A3";
}

.fa-deaf:before,
.fa-deafness:before,
.fa-hard-of-hearing:before {
  content: "\F2A4";
}

.fa-glide:before {
  content: "\F2A5";
}

.fa-glide-g:before {
  content: "\F2A6";
}

.fa-sign-language:before,
.fa-signing:before {
  content: "\F2A7";
}

.fa-low-vision:before {
  content: "\F2A8";
}

.fa-viadeo:before {
  content: "\F2A9";
}

.fa-viadeo-square:before {
  content: "\F2AA";
}

.fa-snapchat:before {
  content: "\F2AB";
}

.fa-snapchat-ghost:before {
  content: "\F2AC";
}

.fa-snapchat-square:before {
  content: "\F2AD";
}

.fa-pied-piper:before {
  content: "\F2AE";
}

.fa-first-order:before {
  content: "\F2B0";
}

.fa-yoast:before {
  content: "\F2B1";
}

.fa-themeisle:before {
  content: "\F2B2";
}

.fa-google-plus-circle:before,
.fa-google-plus-official:before {
  content: "\F2B3";
}

.fa-fa:before,
.fa-font-awesome:before {
  content: "\F2B4";
}

.fa-handshake-o:before {
  content: "\F2B5";
}

.fa-envelope-open:before {
  content: "\F2B6";
}

.fa-envelope-open-o:before {
  content: "\F2B7";
}

.fa-linode:before {
  content: "\F2B8";
}

.fa-address-book:before {
  content: "\F2B9";
}

.fa-address-book-o:before {
  content: "\F2BA";
}

.fa-address-card:before,
.fa-vcard:before {
  content: "\F2BB";
}

.fa-address-card-o:before,
.fa-vcard-o:before {
  content: "\F2BC";
}

.fa-user-circle:before {
  content: "\F2BD";
}

.fa-user-circle-o:before {
  content: "\F2BE";
}

.fa-user-o:before {
  content: "\F2C0";
}

.fa-id-badge:before {
  content: "\F2C1";
}

.fa-drivers-license:before,
.fa-id-card:before {
  content: "\F2C2";
}

.fa-drivers-license-o:before,
.fa-id-card-o:before {
  content: "\F2C3";
}

.fa-quora:before {
  content: "\F2C4";
}

.fa-free-code-camp:before {
  content: "\F2C5";
}

.fa-telegram:before {
  content: "\F2C6";
}

.fa-thermometer-4:before,
.fa-thermometer-full:before,
.fa-thermometer:before {
  content: "\F2C7";
}

.fa-thermometer-3:before,
.fa-thermometer-three-quarters:before {
  content: "\F2C8";
}

.fa-thermometer-2:before,
.fa-thermometer-half:before {
  content: "\F2C9";
}

.fa-thermometer-1:before,
.fa-thermometer-quarter:before {
  content: "\F2CA";
}

.fa-thermometer-0:before,
.fa-thermometer-empty:before {
  content: "\F2CB";
}

.fa-shower:before {
  content: "\F2CC";
}

.fa-bath:before,
.fa-bathtub:before,
.fa-s15:before {
  content: "\F2CD";
}

.fa-podcast:before {
  content: "\F2CE";
}

.fa-window-maximize:before {
  content: "\F2D0";
}

.fa-window-minimize:before {
  content: "\F2D1";
}

.fa-window-restore:before {
  content: "\F2D2";
}

.fa-times-rectangle:before,
.fa-window-close:before {
  content: "\F2D3";
}

.fa-times-rectangle-o:before,
.fa-window-close-o:before {
  content: "\F2D4";
}

.fa-bandcamp:before {
  content: "\F2D5";
}

.fa-grav:before {
  content: "\F2D6";
}

.fa-etsy:before {
  content: "\F2D7";
}

.fa-imdb:before {
  content: "\F2D8";
}

.fa-ravelry:before {
  content: "\F2D9";
}

.fa-eercast:before {
  content: "\F2DA";
}

.fa-microchip:before {
  content: "\F2DB";
}

.fa-snowflake-o:before {
  content: "\F2DC";
}

.fa-superpowers:before {
  content: "\F2DD";
}

.fa-wpexplorer:before {
  content: "\F2DE";
}

.fa-meetup:before {
  content: "\F2E0";
}

.icon-user:before {
  content: "\E005";
}

.icon-people:before {
  content: "\E001";
}

.icon-user-female:before {
  content: "\E000";
}

.icon-user-follow:before {
  content: "\E002";
}

.icon-user-following:before {
  content: "\E003";
}

.icon-user-unfollow:before {
  content: "\E004";
}

.icon-login:before {
  content: "\E066";
}

.icon-logout:before {
  content: "\E065";
}

.icon-emotsmile:before {
  content: "\E021";
}

.icon-phone:before {
  content: "\E600";
}

.icon-call-end:before {
  content: "\E048";
}

.icon-call-in:before {
  content: "\E047";
}

.icon-call-out:before {
  content: "\E046";
}

.icon-map:before {
  content: "\E033";
}

.icon-location-pin:before {
  content: "\E096";
}

.icon-direction:before {
  content: "\E042";
}

.icon-directions:before {
  content: "\E041";
}

.icon-compass:before {
  content: "\E045";
}

.icon-layers:before {
  content: "\E034";
}

.icon-menu:before {
  content: "\E601";
}

.icon-list:before {
  content: "\E067";
}

.icon-options-vertical:before {
  content: "\E602";
}

.icon-options:before {
  content: "\E603";
}

.icon-arrow-down:before {
  content: "\E604";
}

.icon-arrow-left:before {
  content: "\E605";
}

.icon-arrow-right:before {
  content: "\E606";
}

.icon-arrow-up:before {
  content: "\E607";
}

.icon-arrow-up-circle:before {
  content: "\E078";
}

.icon-arrow-left-circle:before {
  content: "\E07A";
}

.icon-arrow-right-circle:before {
  content: "\E079";
}

.icon-arrow-down-circle:before {
  content: "\E07B";
}

.icon-check:before {
  content: "\E080";
}

.icon-clock:before {
  content: "\E081";
}

.icon-plus:before {
  content: "\E095";
}

.icon-minus:before {
  content: "\E615";
}

.icon-close:before {
  content: "\E082";
}

.icon-event:before {
  content: "\E619";
}

.icon-exclamation:before {
  content: "\E617";
}

.icon-organization:before {
  content: "\E616";
}

.icon-trophy:before {
  content: "\E006";
}

.icon-screen-smartphone:before {
  content: "\E010";
}

.icon-screen-desktop:before {
  content: "\E011";
}

.icon-plane:before {
  content: "\E012";
}

.icon-notebook:before {
  content: "\E013";
}

.icon-mustache:before {
  content: "\E014";
}

.icon-mouse:before {
  content: "\E015";
}

.icon-magnet:before {
  content: "\E016";
}

.icon-energy:before {
  content: "\E020";
}

.icon-disc:before {
  content: "\E022";
}

.icon-cursor:before {
  content: "\E06E";
}

.icon-cursor-move:before {
  content: "\E023";
}

.icon-crop:before {
  content: "\E024";
}

.icon-chemistry:before {
  content: "\E026";
}

.icon-speedometer:before {
  content: "\E007";
}

.icon-shield:before {
  content: "\E00E";
}

.icon-screen-tablet:before {
  content: "\E00F";
}

.icon-magic-wand:before {
  content: "\E017";
}

.icon-hourglass:before {
  content: "\E018";
}

.icon-graduation:before {
  content: "\E019";
}

.icon-ghost:before {
  content: "\E01A";
}

.icon-game-controller:before {
  content: "\E01B";
}

.icon-fire:before {
  content: "\E01C";
}

.icon-eyeglass:before {
  content: "\E01D";
}

.icon-envelope-open:before {
  content: "\E01E";
}

.icon-envelope-letter:before {
  content: "\E01F";
}

.icon-bell:before {
  content: "\E027";
}

.icon-badge:before {
  content: "\E028";
}

.icon-anchor:before {
  content: "\E029";
}

.icon-wallet:before {
  content: "\E02A";
}

.icon-vector:before {
  content: "\E02B";
}

.icon-speech:before {
  content: "\E02C";
}

.icon-puzzle:before {
  content: "\E02D";
}

.icon-printer:before {
  content: "\E02E";
}

.icon-present:before {
  content: "\E02F";
}

.icon-playlist:before {
  content: "\E030";
}

.icon-pin:before {
  content: "\E031";
}

.icon-picture:before {
  content: "\E032";
}

.icon-handbag:before {
  content: "\E035";
}

.icon-globe-alt:before {
  content: "\E036";
}

.icon-globe:before {
  content: "\E037";
}

.icon-folder-alt:before {
  content: "\E039";
}

.icon-folder:before {
  content: "\E089";
}

.icon-film:before {
  content: "\E03A";
}

.icon-feed:before {
  content: "\E03B";
}

.icon-drop:before {
  content: "\E03E";
}

.icon-drawer:before {
  content: "\E03F";
}

.icon-docs:before {
  content: "\E040";
}

.icon-doc:before {
  content: "\E085";
}

.icon-diamond:before {
  content: "\E043";
}

.icon-cup:before {
  content: "\E044";
}

.icon-calculator:before {
  content: "\E049";
}

.icon-bubbles:before {
  content: "\E04A";
}

.icon-briefcase:before {
  content: "\E04B";
}

.icon-book-open:before {
  content: "\E04C";
}

.icon-basket-loaded:before {
  content: "\E04D";
}

.icon-basket:before {
  content: "\E04E";
}

.icon-bag:before {
  content: "\E04F";
}

.icon-action-undo:before {
  content: "\E050";
}

.icon-action-redo:before {
  content: "\E051";
}

.icon-wrench:before {
  content: "\E052";
}

.icon-umbrella:before {
  content: "\E053";
}

.icon-trash:before {
  content: "\E054";
}

.icon-tag:before {
  content: "\E055";
}

.icon-support:before {
  content: "\E056";
}

.icon-frame:before {
  content: "\E038";
}

.icon-size-fullscreen:before {
  content: "\E057";
}

.icon-size-actual:before {
  content: "\E058";
}

.icon-shuffle:before {
  content: "\E059";
}

.icon-share-alt:before {
  content: "\E05A";
}

.icon-share:before {
  content: "\E05B";
}

.icon-rocket:before {
  content: "\E05C";
}

.icon-question:before {
  content: "\E05D";
}

.icon-pie-chart:before {
  content: "\E05E";
}

.icon-pencil:before {
  content: "\E05F";
}

.icon-note:before {
  content: "\E060";
}

.icon-loop:before {
  content: "\E064";
}

.icon-home:before {
  content: "\E069";
}

.icon-grid:before {
  content: "\E06A";
}

.icon-graph:before {
  content: "\E06B";
}

.icon-microphone:before {
  content: "\E063";
}

.icon-music-tone-alt:before {
  content: "\E061";
}

.icon-music-tone:before {
  content: "\E062";
}

.icon-earphones-alt:before {
  content: "\E03C";
}

.icon-earphones:before {
  content: "\E03D";
}

.icon-equalizer:before {
  content: "\E06C";
}

.icon-like:before {
  content: "\E068";
}

.icon-dislike:before {
  content: "\E06D";
}

.icon-control-start:before {
  content: "\E06F";
}

.icon-control-rewind:before {
  content: "\E070";
}

.icon-control-play:before {
  content: "\E071";
}

.icon-control-pause:before {
  content: "\E072";
}

.icon-control-forward:before {
  content: "\E073";
}

.icon-control-end:before {
  content: "\E074";
}

.icon-volume-1:before {
  content: "\E09F";
}

.icon-volume-2:before {
  content: "\E0A0";
}

.icon-volume-off:before {
  content: "\E0A1";
}

.icon-calendar:before {
  content: "\E075";
}

.icon-bulb:before {
  content: "\E076";
}

.icon-chart:before {
  content: "\E077";
}

.icon-ban:before {
  content: "\E07C";
}

.icon-bubble:before {
  content: "\E07D";
}

.icon-camrecorder:before {
  content: "\E07E";
}

.icon-camera:before {
  content: "\E07F";
}

.icon-cloud-download:before {
  content: "\E083";
}

.icon-cloud-upload:before {
  content: "\E084";
}

.icon-envelope:before {
  content: "\E086";
}

.icon-eye:before {
  content: "\E087";
}

.icon-flag:before {
  content: "\E088";
}

.icon-heart:before {
  content: "\E08A";
}

.icon-info:before {
  content: "\E08B";
}

.icon-key:before {
  content: "\E08C";
}

.icon-link:before {
  content: "\E08D";
}

.icon-lock:before {
  content: "\E08E";
}

.icon-lock-open:before {
  content: "\E08F";
}

.icon-magnifier:before {
  content: "\E090";
}

.icon-magnifier-add:before {
  content: "\E091";
}

.icon-magnifier-remove:before {
  content: "\E092";
}

.icon-paper-clip:before {
  content: "\E093";
}

.icon-paper-plane:before {
  content: "\E094";
}

.icon-power:before {
  content: "\E097";
}

.icon-refresh:before {
  content: "\E098";
}

.icon-reload:before {
  content: "\E099";
}

.icon-settings:before {
  content: "\E09A";
}

.icon-star:before {
  content: "\E09B";
}

.icon-symbol-female:before {
  content: "\E09C";
}

.icon-symbol-male:before {
  content: "\E09D";
}

.icon-target:before {
  content: "\E09E";
}

.icon-credit-card:before {
  content: "\E025";
}

.icon-paypal:before {
  content: "\E608";
}

.icon-social-tumblr:before {
  content: "\E00A";
}

.icon-social-twitter:before {
  content: "\E009";
}

.icon-social-facebook:before {
  content: "\E00B";
}

.icon-social-instagram:before {
  content: "\E609";
}

.icon-social-linkedin:before {
  content: "\E60A";
}

.icon-social-pinterest:before {
  content: "\E60B";
}

.icon-social-github:before {
  content: "\E60C";
}

.icon-social-google:before {
  content: "\E60D";
}

.icon-social-reddit:before {
  content: "\E60E";
}

.icon-social-skype:before {
  content: "\E60F";
}

.icon-social-dribbble:before {
  content: "\E00D";
}

.icon-social-behance:before {
  content: "\E610";
}

.icon-social-foursqare:before {
  content: "\E611";
}

.icon-social-soundcloud:before {
  content: "\E612";
}

.icon-social-spotify:before {
  content: "\E613";
}

.icon-social-stumbleupon:before {
  content: "\E614";
}

.icon-social-youtube:before {
  content: "\E008";
}

.icon-social-dropbox:before {
  content: "\E00C";
}

.icon-social-vkontakte:before {
  content: "\E618";
}

.icon-social-steam:before {
  content: "\E620";
}
/*!* CoreUI Pro - Dashboard UI Kit
* @version v2.1.3
* @link https://coreui.io/pro/
* Copyright (c) 2018 creativeLabs Łukasz Holeczek*/ /*!* CoreUI Pro - Dashboard UI Kit
* @version v2.1.3
* @link https://coreui.io/pro/
* Copyright (c) 2018 creativeLabs Łukasz Holeczek*/ /*!* Bootstrap v4.1.3 (https://getbootstrap.com/)
* Copyright 2011-2018 The Bootstrap Authors
* Copyright 2011-2018 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)*/
:root {
  --blue: #20a8d8;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #f86c6b;
  --orange: #f8cb00;
  --yellow: #ffc107;
  --green: #4dbd74;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #73818f;
  --gray-dark: #2f353a;
  --light-blue: #63c2de;
  --primary: #20a8d8;
  --secondary: #73818f;
  --success: #4dbd74;
  --info: #63c2de;
  --warning: #ffc107;
  --danger: #f86c6b;
  --light: #f3f4f5;
  --dark: #2f353a;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

html {
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol, Noto Color Emoji;
  line-height: 1.5;
  color: #e4e7ea;
  background-color: #2f353a;
}

a {
  color: #20a8d8;
  text-decoration: none;
  background-color: transparent;
}

a:hover {
  color: #167495;
}

a:not([href]):not([tabindex]),
a:not([href]):not([tabindex]):focus,
a:not([href]):not([tabindex]):hover {
  color: inherit;
}

caption {
  color: #73818f;
}

button:focus {
  outline: 5px auto -webkit-focus-ring-color;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  color: inherit;
}

hr {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.blockquote-footer {
  color: #73818f;
}

.img-thumbnail {
  padding: 0.25rem;
  background-color: #2f353a;
  border: 1px solid #c8ced3;
}

.figure-caption {
  color: #73818f;
}

code {
  color: #e83e8c;
  word-break: break-word;
}

a > code {
  color: inherit;
}

kbd {
  padding: 0.2rem 0.4rem;
  color: #fff;
  background-color: #23282c;
}

pre {
  display: block;
  font-size: 87.5%;
  color: #23282c;
}

pre code {
  font-size: inherit;
  color: inherit;
  word-break: normal;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

.table td,
.table th {
  border-top: 1px solid #23282c;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #23282c;
}

.table tbody + tbody {
  border-top: 2px solid #23282c;
}

.table {
  background-color: #2f353a;
}
.table {
  text-align: center;
  color: #e4e7ea;
}

.table-bordered,
.table-bordered td,
.table-bordered th {
  border: 1px solid #23282c;
  background-color: #3a4149;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-primary,
.table-primary > td,
.table-primary > th {
  background-color: #c1e7f4;
}

.table-hover .table-primary:hover,
.table-hover .table-primary:hover > td,
.table-hover .table-primary:hover > th {
  background-color: #abdff0;
}

.table-secondary,
.table-secondary > td,
.table-secondary > th {
  background-color: #d8dce0;
}

.table-hover .table-secondary:hover,
.table-hover .table-secondary:hover > td,
.table-hover .table-secondary:hover > th {
  background-color: #cacfd5;
}

.table-success,
.table-success > td,
.table-success > th {
  background-color: #cdedd8;
}

.table-hover .table-success:hover,
.table-hover .table-success:hover > td,
.table-hover .table-success:hover > th {
  background-color: #bae6c9;
}

.table-info,
.table-info > td,
.table-info > th {
  background-color: #d3eef6;
}

.table-hover .table-info:hover,
.table-hover .table-info:hover > td,
.table-hover .table-info:hover > th {
  background-color: #bee6f2;
}

.table-warning,
.table-warning > td,
.table-warning > th {
  background-color: #ffeeba;
}

.table-hover .table-warning:hover,
.table-hover .table-warning:hover > td,
.table-hover .table-warning:hover > th {
  background-color: #ffe8a1;
}

.table-danger,
.table-danger > td,
.table-danger > th {
  background-color: #fdd6d6;
}

.table-hover .table-danger:hover,
.table-hover .table-danger:hover > td,
.table-hover .table-danger:hover > th {
  background-color: #fcbebe;
}

.table-light,
.table-light > td,
.table-light > th {
  background-color: #fcfcfc;
}

.table-hover .table-light:hover,
.table-hover .table-light:hover > td,
.table-hover .table-light:hover > th {
  background-color: #efefef;
}

.table-dark,
.table-dark > td,
.table-dark > th {
  background-color: #c5c6c8;
}

.table-hover .table-dark:hover,
.table-hover .table-dark:hover > td,
.table-hover .table-dark:hover > th {
  background-color: #b8b9bc;
}

.table-active,
.table-active > td,
.table-active > th,
.table-hover .table-active:hover,
.table-hover .table-active:hover > td,
.table-hover .table-active:hover > th {
  background-color: rgba(0, 0, 0, 0.075);
}

.table .thead-dark th {
  color: #2f353a;
  background-color: #23282c;
  border-color: #343b41;
}

.table .thead-light th {
  color: #e4e7ea;
  background-color: #343b41;
  border-color: #23282c;
}

.table-dark {
  color: #2f353a;
  background-color: #23282c;
}

.table-dark td,
.table-dark th,
.table-dark thead th {
  border-color: #343b41;
}

.table-dark.table-striped tbody tr:nth-of-type(odd) {
  background-color: hsla(0, 0%, 100%, 0.05);
}

.table-dark.table-hover tbody tr:hover {
  background-color: hsla(0, 0%, 100%, 0.075);
}

.form-control {
  color: #e4e7ea;
  background-color: #515b65;
  background-clip: padding-box;
  border: 1px solid #23282c;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

.form-control::-ms-expand {
  background-color: transparent;
  border: 0;
}

.form-control:focus {
  color: #e4e7ea;
  background-color: #515b65;
  border-color: #8ad4ee;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
}

.form-control::-webkit-input-placeholder {
  color: #acb4bc;
  opacity: 1;
}

.form-control::-ms-input-placeholder {
  color: #acb4bc;
  opacity: 1;
}

.form-control::placeholder {
  color: #acb4bc;
  opacity: 1;
}

.form-control:disabled,
.form-control[readonly] {
  background-color: #3a4149;
  opacity: 1;
}

select.form-control:focus::-ms-value {
  color: #e4e7ea;
  background-color: #515b65;
}
.form-control-plaintext {
  color: #e4e7ea;
  background-color: transparent;
  border: solid transparent;
}

.form-check-input:disabled ~ .form-check-label {
  color: #73818f;
}

.valid-feedback {
  color: #4dbd74;
}

.valid-tooltip {
  color: #fff;
  background-color: rgba(77, 189, 116, 0.9);
}

.custom-select.is-valid,
.form-control.is-valid,
.was-validated .custom-select:valid,
.was-validated .form-control:valid {
  border-color: #4dbd74;
}

.custom-select.is-valid:focus,
.form-control.is-valid:focus,
.was-validated .custom-select:valid:focus,
.was-validated .form-control:valid:focus {
  border-color: #4dbd74;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.25);
}

.form-check-input.is-valid ~ .form-check-label,
.was-validated .form-check-input:valid ~ .form-check-label {
  color: #4dbd74;
}

.custom-control-input.is-valid ~ .custom-control-label,
.was-validated .custom-control-input:valid ~ .custom-control-label {
  color: #4dbd74;
}

.custom-control-input.is-valid ~ .custom-control-label:before,
.was-validated .custom-control-input:valid ~ .custom-control-label:before {
  background-color: #aadfbd;
}

.custom-control-input.is-valid:checked ~ .custom-control-label:before,
.was-validated
  .custom-control-input:valid:checked
  ~ .custom-control-label:before {
  background-color: #72cb91;
}

.custom-control-input.is-valid:focus ~ .custom-control-label:before,
.was-validated
  .custom-control-input:valid:focus
  ~ .custom-control-label:before {
  -webkit-box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(77, 189, 116, 0.25);
  box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(77, 189, 116, 0.25);
}

.custom-file-input.is-valid ~ .custom-file-label,
.was-validated .custom-file-input:valid ~ .custom-file-label {
  border-color: #4dbd74;
}

.custom-file-input.is-valid:focus ~ .custom-file-label,
.was-validated .custom-file-input:valid:focus ~ .custom-file-label {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.25);
}

.invalid-feedback {
  color: #f86c6b;
}

.invalid-tooltip {
  color: #fff;
  background-color: rgba(248, 108, 107, 0.9);
}

.custom-select.is-invalid,
.form-control.is-invalid,
.was-validated .custom-select:invalid,
.was-validated .form-control:invalid {
  border-color: #f86c6b;
}

.custom-select.is-invalid:focus,
.form-control.is-invalid:focus,
.was-validated .custom-select:invalid:focus,
.was-validated .form-control:invalid:focus {
  border-color: #f86c6b;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.25);
}

.custom-select.is-invalid ~ .invalid-feedback,
.custom-select.is-invalid ~ .invalid-tooltip,
.form-control-file.is-invalid ~ .invalid-feedback,
.form-control-file.is-invalid ~ .invalid-tooltip,
.form-control.is-invalid ~ .invalid-feedback,
.form-control.is-invalid ~ .invalid-tooltip,
.was-validated .custom-select:invalid ~ .invalid-feedback,
.was-validated .custom-select:invalid ~ .invalid-tooltip,
.was-validated .form-control-file:invalid ~ .invalid-feedback,
.was-validated .form-control-file:invalid ~ .invalid-tooltip,
.was-validated .form-control:invalid ~ .invalid-feedback,
.was-validated .form-control:invalid ~ .invalid-tooltip {
  display: block;
}

.form-check-input.is-invalid ~ .form-check-label,
.was-validated .form-check-input:invalid ~ .form-check-label {
  color: #f86c6b;
}

.form-check-input.is-invalid ~ .invalid-feedback,
.form-check-input.is-invalid ~ .invalid-tooltip,
.was-validated .form-check-input:invalid ~ .invalid-feedback,
.was-validated .form-check-input:invalid ~ .invalid-tooltip {
  display: block;
}

.custom-control-input.is-invalid ~ .custom-control-label,
.was-validated .custom-control-input:invalid ~ .custom-control-label {
  color: #f86c6b;
}

.custom-control-input.is-invalid ~ .custom-control-label:before,
.was-validated .custom-control-input:invalid ~ .custom-control-label:before {
  background-color: #fee5e5;
}

.custom-control-input.is-invalid:checked ~ .custom-control-label:before,
.was-validated
  .custom-control-input:invalid:checked
  ~ .custom-control-label:before {
  background-color: #fa9c9c;
}

.custom-control-input.is-invalid:focus ~ .custom-control-label:before,
.was-validated
  .custom-control-input:invalid:focus
  ~ .custom-control-label:before {
  -webkit-box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(248, 108, 107, 0.25);
  box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(248, 108, 107, 0.25);
}

.custom-file-input.is-invalid ~ .custom-file-label,
.was-validated .custom-file-input:invalid ~ .custom-file-label {
  border-color: #f86c6b;
}

.custom-file-input.is-invalid:focus ~ .custom-file-label,
.was-validated .custom-file-input:invalid:focus ~ .custom-file-label {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.25);
}

.btn {
  border: 1px solid transparent;
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

.btn.focus,
.btn:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
}

.btn-primary {
  color: #fff;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.btn-primary:hover {
  color: #fff;
  background-color: #1b8eb7;
  border-color: #1985ac;
}

.btn-primary.focus,
.btn-primary:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
}

.btn-primary.disabled,
.btn-primary:disabled {
  color: #fff;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.btn-primary:not(:disabled):not(.disabled).active,
.btn-primary:not(:disabled):not(.disabled):active,
.show > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #1985ac;
  border-color: #187da0;
}

.btn-primary:not(:disabled):not(.disabled).active:focus,
.btn-primary:not(:disabled):not(.disabled):active:focus,
.show > .btn-primary.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
}

.btn-secondary {
  color: #fff;
  background-color: #73818f;
  border-color: #73818f;
}

.btn-secondary:hover {
  color: #fff;
  background-color: #626e7a;
  border-color: #5c6873;
}

.btn-secondary.focus,
.btn-secondary:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
}

.btn-secondary.disabled,
.btn-secondary:disabled {
  color: #fff;
  background-color: #73818f;
  border-color: #73818f;
}

.btn-secondary:not(:disabled):not(.disabled).active,
.btn-secondary:not(:disabled):not(.disabled):active,
.show > .btn-secondary.dropdown-toggle {
  color: #fff;
  background-color: #5c6873;
  border-color: #56616c;
}

.btn-secondary:not(:disabled):not(.disabled).active:focus,
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
}

.btn-success {
  color: #fff;
  background-color: #4dbd74;
  border-color: #4dbd74;
}

.btn-success:hover {
  color: #fff;
  background-color: #3ea662;
  border-color: #3a9d5d;
}

.btn-success.focus,
.btn-success:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
}

.btn-success.disabled,
.btn-success:disabled {
  color: #fff;
  background-color: #4dbd74;
  border-color: #4dbd74;
}

.btn-success:not(:disabled):not(.disabled).active,
.btn-success:not(:disabled):not(.disabled):active,
.show > .btn-success.dropdown-toggle {
  color: #fff;
  background-color: #3a9d5d;
  border-color: #379457;
}

.btn-success:not(:disabled):not(.disabled).active:focus,
.btn-success:not(:disabled):not(.disabled):active:focus,
.show > .btn-success.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
}

.btn-info {
  color: #23282c;
  background-color: #63c2de;
  border-color: #63c2de;
}

.btn-info:hover {
  color: #23282c;
  background-color: #43b6d7;
  border-color: #39b2d5;
}

.btn-info.focus,
.btn-info:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
}

.btn-info.disabled,
.btn-info:disabled {
  color: #23282c;
  background-color: #63c2de;
  border-color: #63c2de;
}

.btn-info:not(:disabled):not(.disabled).active,
.btn-info:not(:disabled):not(.disabled):active,
.show > .btn-info.dropdown-toggle {
  color: #fff;
  background-color: #39b2d5;
  border-color: #2eadd3;
}

.btn-info:not(:disabled):not(.disabled).active:focus,
.btn-info:not(:disabled):not(.disabled):active:focus,
.show > .btn-info.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
}

.btn-warning {
  color: #23282c;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-warning:hover {
  color: #23282c;
  background-color: #e0a800;
  border-color: #d39e00;
}

.btn-warning.focus,
.btn-warning:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-warning.disabled,
.btn-warning:disabled {
  color: #23282c;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-warning:not(:disabled):not(.disabled).active,
.btn-warning:not(:disabled):not(.disabled):active,
.show > .btn-warning.dropdown-toggle {
  color: #23282c;
  background-color: #d39e00;
  border-color: #c69500;
}

.btn-warning:not(:disabled):not(.disabled).active:focus,
.btn-warning:not(:disabled):not(.disabled):active:focus,
.show > .btn-warning.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-danger {
  color: #fff;
  background-color: #f86c6b;
  border-color: #f86c6b;
}

.btn-danger:hover {
  color: #fff;
  background-color: #f64846;
  border-color: #f63c3a;
}

.btn-danger.focus,
.btn-danger:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
}

.btn-danger.disabled,
.btn-danger:disabled {
  color: #fff;
  background-color: #f86c6b;
  border-color: #f86c6b;
}

.btn-danger:not(:disabled):not(.disabled).active,
.btn-danger:not(:disabled):not(.disabled):active,
.show > .btn-danger.dropdown-toggle {
  color: #fff;
  background-color: #f63c3a;
  border-color: #f5302e;
}

.btn-danger:not(:disabled):not(.disabled).active:focus,
.btn-danger:not(:disabled):not(.disabled):active:focus,
.show > .btn-danger.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
}

.btn-light {
  color: #23282c;
  background-color: #f3f4f5;
  border-color: #f3f4f5;
}

.btn-light:hover {
  color: #23282c;
  background-color: #dde1e4;
  border-color: #d6dade;
}

.btn-light.focus,
.btn-light:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
}

.btn-light.disabled,
.btn-light:disabled {
  color: #23282c;
  background-color: #f3f4f5;
  border-color: #f3f4f5;
}

.btn-light:not(:disabled):not(.disabled).active,
.btn-light:not(:disabled):not(.disabled):active,
.show > .btn-light.dropdown-toggle {
  color: #23282c;
  background-color: #d6dade;
  border-color: #cfd4d9;
}

.btn-light:not(:disabled):not(.disabled).active:focus,
.btn-light:not(:disabled):not(.disabled):active:focus,
.show > .btn-light.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
}

.btn-dark {
  color: #fff;
  background-color: #2f353a;
  border-color: #2f353a;
}

.btn-dark:hover {
  color: #fff;
  background-color: #1e2125;
  border-color: #181b1e;
}

.btn-dark.focus,
.btn-dark:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
}

.btn-dark.disabled,
.btn-dark:disabled {
  color: #fff;
  background-color: #2f353a;
  border-color: #2f353a;
}

.btn-dark:not(:disabled):not(.disabled).active,
.btn-dark:not(:disabled):not(.disabled):active,
.show > .btn-dark.dropdown-toggle {
  color: #fff;
  background-color: #181b1e;
  border-color: #121517;
}

.btn-dark:not(:disabled):not(.disabled).active:focus,
.btn-dark:not(:disabled):not(.disabled):active:focus,
.show > .btn-dark.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
}

.btn-outline-primary {
  color: #20a8d8;
  background-color: transparent;
  border-color: #20a8d8;
}

.btn-outline-primary:hover {
  color: #fff;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.btn-outline-primary.focus,
.btn-outline-primary:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
}

.btn-outline-primary.disabled,
.btn-outline-primary:disabled {
  color: #20a8d8;
  background-color: transparent;
}

.btn-outline-primary:not(:disabled):not(.disabled).active,
.btn-outline-primary:not(:disabled):not(.disabled):active,
.show > .btn-outline-primary.dropdown-toggle {
  color: #fff;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.btn-outline-primary:not(:disabled):not(.disabled).active:focus,
.btn-outline-primary:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-primary.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
}

.btn-outline-secondary {
  color: #73818f;
  background-color: transparent;
  border-color: #73818f;
}

.btn-outline-secondary:hover {
  color: #fff;
  background-color: #73818f;
  border-color: #73818f;
}

.btn-outline-secondary.focus,
.btn-outline-secondary:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
}

.btn-outline-secondary.disabled,
.btn-outline-secondary:disabled {
  color: #73818f;
  background-color: transparent;
}

.btn-outline-secondary:not(:disabled):not(.disabled).active,
.btn-outline-secondary:not(:disabled):not(.disabled):active,
.show > .btn-outline-secondary.dropdown-toggle {
  color: #fff;
  background-color: #73818f;
  border-color: #73818f;
}

.btn-outline-secondary:not(:disabled):not(.disabled).active:focus,
.btn-outline-secondary:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-secondary.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
}

.btn-outline-success {
  color: #4dbd74;
  background-color: transparent;
  background-image: none;
  border-color: #4dbd74;
}

.btn-outline-success:hover {
  color: #fff;
  background-color: #4dbd74;
  border-color: #4dbd74;
}

.btn-outline-success.focus,
.btn-outline-success:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
}

.btn-outline-success.disabled,
.btn-outline-success:disabled {
  color: #4dbd74;
  background-color: transparent;
}

.btn-outline-success:not(:disabled):not(.disabled).active,
.btn-outline-success:not(:disabled):not(.disabled):active,
.show > .btn-outline-success.dropdown-toggle {
  color: #fff;
  background-color: #4dbd74;
  border-color: #4dbd74;
}

.btn-outline-success:not(:disabled):not(.disabled).active:focus,
.btn-outline-success:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-success.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
}

.btn-outline-info {
  color: #63c2de;
  background-color: transparent;
  background-image: none;
  border-color: #63c2de;
}

.btn-outline-info:hover {
  color: #23282c;
  background-color: #63c2de;
  border-color: #63c2de;
}

.btn-outline-info.focus,
.btn-outline-info:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
}

.btn-outline-info.disabled,
.btn-outline-info:disabled {
  color: #63c2de;
  background-color: transparent;
}

.btn-outline-info:not(:disabled):not(.disabled).active,
.btn-outline-info:not(:disabled):not(.disabled):active,
.show > .btn-outline-info.dropdown-toggle {
  color: #23282c;
  background-color: #63c2de;
  border-color: #63c2de;
}

.btn-outline-info:not(:disabled):not(.disabled).active:focus,
.btn-outline-info:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-info.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
}

.btn-outline-warning {
  color: #ffc107;
  background-color: transparent;
  background-image: none;
  border-color: #ffc107;
}

.btn-outline-warning:hover {
  color: #23282c;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-outline-warning.focus,
.btn-outline-warning:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-outline-warning.disabled,
.btn-outline-warning:disabled {
  color: #ffc107;
  background-color: transparent;
}

.btn-outline-warning:not(:disabled):not(.disabled).active,
.btn-outline-warning:not(:disabled):not(.disabled):active,
.show > .btn-outline-warning.dropdown-toggle {
  color: #23282c;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-outline-warning:not(:disabled):not(.disabled).active:focus,
.btn-outline-warning:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-warning.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-outline-danger {
  color: #f86c6b;
  background-color: transparent;
  background-image: none;
  border-color: #f86c6b;
}

.btn-outline-danger:hover {
  color: #fff;
  background-color: #f86c6b;
  border-color: #f86c6b;
}

.btn-outline-danger.focus,
.btn-outline-danger:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
}

.btn-outline-danger.disabled,
.btn-outline-danger:disabled {
  color: #f86c6b;
  background-color: transparent;
}

.btn-outline-danger:not(:disabled):not(.disabled).active,
.btn-outline-danger:not(:disabled):not(.disabled):active,
.show > .btn-outline-danger.dropdown-toggle {
  color: #fff;
  background-color: #f86c6b;
  border-color: #f86c6b;
}

.btn-outline-danger:not(:disabled):not(.disabled).active:focus,
.btn-outline-danger:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-danger.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
}

.btn-outline-light {
  color: #f3f4f5;
  background-color: transparent;
  border-color: #f3f4f5;
}

.btn-outline-light:hover {
  color: #23282c;
  background-color: #f3f4f5;
  border-color: #f3f4f5;
}

.btn-outline-light.focus,
.btn-outline-light:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
}

.btn-outline-light.disabled,
.btn-outline-light:disabled {
  color: #f3f4f5;
  background-color: transparent;
}

.btn-outline-light:not(:disabled):not(.disabled).active,
.btn-outline-light:not(:disabled):not(.disabled):active,
.show > .btn-outline-light.dropdown-toggle {
  color: #23282c;
  background-color: #f3f4f5;
  border-color: #f3f4f5;
}

.btn-outline-light:not(:disabled):not(.disabled).active:focus,
.btn-outline-light:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-light.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
}

.btn-outline-dark {
  color: #2f353a;
  background-color: transparent;
  background-image: none;
  border-color: #2f353a;
}

.btn-outline-dark:hover {
  color: #fff;
  background-color: #2f353a;
  border-color: #2f353a;
}

.btn-outline-dark.focus,
.btn-outline-dark:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
}

.btn-outline-dark.disabled,
.btn-outline-dark:disabled {
  color: #2f353a;
  background-color: transparent;
}

.btn-outline-dark:not(:disabled):not(.disabled).active,
.btn-outline-dark:not(:disabled):not(.disabled):active,
.show > .btn-outline-dark.dropdown-toggle {
  color: #fff;
  background-color: #2f353a;
  border-color: #2f353a;
}

.btn-outline-dark:not(:disabled):not(.disabled).active:focus,
.btn-outline-dark:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-dark.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
}

.btn-link {
  font-weight: 400;
  color: #20a8d8;
  background-color: transparent;
}

.btn-link:hover {
  color: #167495;
  background-color: transparent;
}

.btn-link.focus,
.btn-link:focus,
.btn-link:hover {
  border-color: transparent;
}

.btn-link.disabled,
.btn-link:disabled {
  color: #73818f;
}

.dropdown-toggle:after {
  content: "";
  border-right: 0.3em solid transparent;
  border-left: 0.3em solid transparent;
}

.dropdown-menu {
  color: #e4e7ea;
  background-color: #3a4149;
  border: 1px solid #23282c;
}

.dropup .dropdown-toggle:after {
  content: "";
  border-right: 0.3em solid transparent;
  border-left: 0.3em solid transparent;
}

.dropright .dropdown-toggle:after {
  border-top: 0.3em solid transparent;
  border-bottom: 0.3em solid transparent;
}

.dropleft .dropdown-toggle:before {
  content: "";
  border-top: 0.3em solid transparent;
  border-bottom: 0.3em solid transparent;
}

.dropdown-divider {
  border-top: 1px solid #343b41;
}

.dropdown-item {
  color: #e4e7ea;
  background-color: transparent;
}

.dropdown-item:focus,
.dropdown-item:hover {
  color: #e4e7ea;
  background-color: #2f353a;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #343b41;
  background-color: #20a8d8;
}

.dropdown-item.disabled,
.dropdown-item:disabled {
  color: #73818f;
  background-color: transparent;
}

.dropdown-header {
  color: #e4e7ea;
}

.dropdown-item-text {
  color: #e4e7ea;
}

.input-group-text {
  color: #e4e7ea;
  background-color: #343b41;
  border: 1px solid #23282c;
}

.custom-control-input:checked ~ .custom-control-label:before {
  color: #343b41;
  background-color: #20a8d8;
}

.custom-control-input:focus ~ .custom-control-label:before {
  -webkit-box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
  box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
}

.custom-control-input:active ~ .custom-control-label:before {
  color: #343b41;
  background-color: #b6e4f4;
}

.custom-control-input:disabled ~ .custom-control-label {
  color: #73818f;
}

.custom-control-input:disabled ~ .custom-control-label:before {
  background-color: #e4e7ea;
}

.custom-control-label:before {
  background-color: #c8ced3;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label:before {
  background-color: #20a8d8;
}

.custom-checkbox .custom-control-input:checked ~ .custom-control-label:after {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA4IDgnPjxwYXRoIGZpbGw9JyMzNDNiNDEnIGQ9J002LjU2NC43NWwtMy41OSAzLjYxMi0xLjUzOC0xLjU1TDAgNC4yNiAyLjk3NCA3LjI1IDggMi4xOTN6Jy8+PC9zdmc+);
}

.custom-checkbox
  .custom-control-input:indeterminate
  ~ .custom-control-label:before {
  background-color: #20a8d8;
}

.custom-checkbox
  .custom-control-input:indeterminate
  ~ .custom-control-label:after {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA0IDQnPjxwYXRoIHN0cm9rZT0nIzM0M2I0MScgZD0nTTAgMmg0Jy8+PC9zdmc+);
}

.custom-checkbox
  .custom-control-input:disabled:checked
  ~ .custom-control-label:before {
  background-color: rgba(32, 168, 216, 0.5);
}

.custom-checkbox
  .custom-control-input:disabled:indeterminate
  ~ .custom-control-label:before {
  background-color: rgba(32, 168, 216, 0.5);
}

.custom-radio .custom-control-input:checked ~ .custom-control-label:before {
  background-color: #20a8d8;
}

.custom-radio .custom-control-input:checked ~ .custom-control-label:after {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9Jy00IC00IDggOCc+PGNpcmNsZSByPSczJyBmaWxsPScjMzQzYjQxJy8+PC9zdmc+);
}

.custom-radio
  .custom-control-input:disabled:checked
  ~ .custom-control-label:before {
  background-color: rgba(32, 168, 216, 0.5);
}

.custom-select {
  color: #e4e7ea;
  background: #515b65
    url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA0IDUnPjxwYXRoIGZpbGw9JyMyZjM1M2EnIGQ9J00yIDBMMCAyaDR6bTAgNUwwIDNoNHonLz48L3N2Zz4=)
    no-repeat right 0.75rem center;
  border: 1px solid #23282c;
}

.custom-select:focus {
  border-color: #8ad4ee;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(138, 212, 238, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(138, 212, 238, 0.5);
}

.custom-select:focus::-ms-value {
  color: #e4e7ea;
  background-color: #515b65;
}

.custom-select:disabled {
  color: #73818f;
  background-color: #e4e7ea;
}

.custom-file-input:focus ~ .custom-file-label {
  border-color: #8ad4ee;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
}

.custom-file-input:focus ~ .custom-file-label:after {
  border-color: #8ad4ee;
}

.custom-file-input:disabled ~ .custom-file-label {
  background-color: #3a4149;
}

.custom-file-label {
  background-color: #515b65;
  border: 1px solid #23282c;
}

.custom-file-label,
.custom-file-label:after {
  color: #e4e7ea;
}

.custom-file-label:after {
  background-color: #343b41;
  border-left: 1px solid #23282c;
}

.custom-range {
  background-color: transparent;
}

.custom-range:focus::-webkit-slider-thumb {
  -webkit-box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
  box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
}

.custom-range:focus::-moz-range-thumb {
  box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
}

.custom-range:focus::-ms-thumb {
  box-shadow: 0 0 0 1px #2f353a, 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
}

.custom-range::-webkit-slider-thumb {
  background-color: #20a8d8;
  -webkit-transition: background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

.custom-range::-webkit-slider-thumb:active {
  background-color: #b6e4f4;
}

.custom-range::-webkit-slider-runnable-track {
  color: transparent;
  background-color: #c8ced3;
  border-color: transparent;
}

.custom-range::-moz-range-thumb {
  background-color: #20a8d8;
  -webkit-transition: background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  -moz-appearance: none;
  appearance: none;
}

.custom-range::-moz-range-thumb:active {
  background-color: #b6e4f4;
}

.custom-range::-moz-range-track {
  color: transparent;
  background-color: #c8ced3;
  border-color: transparent;
}

.custom-range::-ms-thumb {
  background-color: #20a8d8;
  -webkit-transition: background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  appearance: none;
}

.custom-range::-ms-thumb:active {
  background-color: #b6e4f4;
}

.custom-range::-ms-track {
  color: transparent;
  background-color: transparent;
  border-color: transparent;
}

.custom-range::-ms-fill-lower,
.custom-range::-ms-fill-upper {
  background-color: #c8ced3;
}

.custom-control-label:before,
.custom-file-label,
.custom-select {
  -webkit-transition: background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

.nav-link.disabled {
  color: #73818f;
}

.nav-tabs {
  border-bottom: 1px solid #23282c;
}

.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover {
  border-color: #23282c #23282c #23282c;
}

.nav-tabs .nav-link.disabled {
  color: #73818f;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #f3f4f5;
  background-color: #343b41;
  border-color: #23282c #23282c #23282c;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #343b41;
  background-color: #20a8d8;
}

.navbar-light .navbar-brand,
.navbar-light .navbar-brand:focus,
.navbar-light .navbar-brand:hover {
  color: rgba(0, 0, 0, 0.9);
}

.navbar-light .navbar-nav .nav-link {
  color: rgba(0, 0, 0, 0.5);
}

.navbar-light .navbar-nav .nav-link:focus,
.navbar-light .navbar-nav .nav-link:hover {
  color: rgba(0, 0, 0, 0.7);
}

.navbar-light .navbar-nav .nav-link.disabled {
  color: rgba(0, 0, 0, 0.3);
}

.navbar-light .navbar-nav .active > .nav-link,
.navbar-light .navbar-nav .nav-link.active,
.navbar-light .navbar-nav .nav-link.show,
.navbar-light .navbar-nav .show > .nav-link {
  color: rgba(0, 0, 0, 0.9);
}

.navbar-light .navbar-toggler {
  color: rgba(0, 0, 0, 0.5);
  border-color: rgba(0, 0, 0, 0.1);
}

.navbar-light .navbar-toggler-icon {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMzAgMzAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggc3Ryb2tlPSdyZ2JhKDAsIDAsIDAsIDAuNSknIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbWl0ZXJsaW1pdD0nMTAnIGQ9J000IDdoMjJNNCAxNWgyMk00IDIzaDIyJy8+PC9zdmc+);
}

.navbar-light .navbar-text {
  color: rgba(0, 0, 0, 0.5);
}

.navbar-light .navbar-text a,
.navbar-light .navbar-text a:focus,
.navbar-light .navbar-text a:hover {
  color: rgba(0, 0, 0, 0.9);
}

.navbar-dark .navbar-brand,
.navbar-dark .navbar-brand:focus,
.navbar-dark .navbar-brand:hover {
  color: #fff;
}

.navbar-dark .navbar-nav .nav-link {
  color: hsla(0, 0%, 100%, 0.5);
}

.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: hsla(0, 0%, 100%, 0.75);
}

.navbar-dark .navbar-nav .nav-link.disabled {
  color: hsla(0, 0%, 100%, 0.25);
}

.navbar-dark .navbar-nav .active > .nav-link,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .show > .nav-link {
  color: #fff;
}

.navbar-dark .navbar-toggler {
  color: hsla(0, 0%, 100%, 0.5);
  border-color: hsla(0, 0%, 100%, 0.1);
}

.navbar-dark .navbar-toggler-icon {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMzAgMzAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggc3Ryb2tlPSdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSknIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbWl0ZXJsaW1pdD0nMTAnIGQ9J000IDdoMjJNNCAxNWgyMk00IDIzaDIyJy8+PC9zdmc+);
}

.navbar-dark .navbar-text {
  color: hsla(0, 0%, 100%, 0.5);
}

.navbar-dark .navbar-text a,
.navbar-dark .navbar-text a:focus,
.navbar-dark .navbar-text a:hover {
  color: #fff;
}

.card {
  background-color: #3a4149;
  border: 1px solid #23282c;
}

.card-header {
  background-color: #343b41;
  border-bottom: 1px solid #23282c;
}

.card-footer {
  background-color: #343b41;
  border-top: 1px solid #23282c;
}

.breadcrumb {
  background-color: #3a4149;
}

.breadcrumb-item + .breadcrumb-item:before {
  color: #f3f4f5;
  content: "/";
}

.breadcrumb-item.active {
  color: #f3f4f5;
}

.page-link {
  color: #20a8d8;
  background-color: #343b41;
  border: 1px solid #23282c;
}

.page-link:hover {
  color: #167495;
  background-color: #2f353a;
  border-color: #23282c;
}

.page-link:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
}

.page-item.active .page-link {
  color: #343b41;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.page-item.disabled .page-link {
  color: #73818f;
  background-color: #23282c;
  border-color: #23282c;
}

.badge-primary {
  color: #fff;
  background-color: #20a8d8;
}

.badge-primary[href]:focus,
.badge-primary[href]:hover {
  color: #fff;
  text-decoration: none;
  background-color: #1985ac;
}

.badge-secondary {
  color: #fff;
  background-color: #73818f;
}

.badge-secondary[href]:focus,
.badge-secondary[href]:hover {
  color: #fff;
  text-decoration: none;
  background-color: #5c6873;
}

.badge-success {
  color: #fff;
  background-color: #4dbd74;
}

.badge-success[href]:focus,
.badge-success[href]:hover {
  color: #fff;
  text-decoration: none;
  background-color: #3a9d5d;
}

.badge-info {
  color: #23282c;
  background-color: #63c2de;
}

.badge-info[href]:focus,
.badge-info[href]:hover {
  color: #23282c;
  text-decoration: none;
  background-color: #39b2d5;
}

.badge-warning {
  color: #23282c;
  background-color: #ffc107;
}

.badge-warning[href]:focus,
.badge-warning[href]:hover {
  color: #23282c;
  text-decoration: none;
  background-color: #d39e00;
}

.badge-danger {
  color: #fff;
  background-color: #f86c6b;
}

.badge-danger[href]:focus,
.badge-danger[href]:hover {
  color: #fff;
  text-decoration: none;
  background-color: #f63c3a;
}

.badge-light {
  color: #23282c;
  background-color: #f3f4f5;
}

.badge-light[href]:focus,
.badge-light[href]:hover {
  color: #23282c;
  text-decoration: none;
  background-color: #d6dade;
}

.badge-dark {
  color: #fff;
  background-color: #2f353a;
}

.badge-dark[href]:focus,
.badge-dark[href]:hover {
  color: #fff;
  background-color: #181b1e;
}

.jumbotron {
  background-color: #73818f;
}

.alert-heading {
  color: inherit;
}

.alert-dismissible .close {
  color: inherit;
}

.alert-primary {
  color: #115770;
  background-color: #d2eef7;
  border-color: #c1e7f4;
}

.alert-primary hr {
  border-top-color: #abdff0;
}

.alert-primary .alert-link {
  color: #0a3544;
}

.alert-secondary {
  color: #3c434a;
  background-color: #e3e6e9;
  border-color: #d8dce0;
}

.alert-secondary hr {
  border-top-color: #cacfd5;
}

.alert-secondary .alert-link {
  color: #252a2e;
}

.alert-success {
  color: #28623c;
  background-color: #dbf2e3;
  border-color: #cdedd8;
}

.alert-success hr {
  border-top-color: #bae6c9;
}

.alert-success .alert-link {
  color: #193e26;
}

.alert-info {
  color: #336573;
  background-color: #e0f3f8;
  border-color: #d3eef6;
}

.alert-info hr {
  border-top-color: #bee6f2;
}

.alert-info .alert-link {
  color: #234650;
}

.alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.alert-warning hr {
  border-top-color: #ffe8a1;
}

.alert-warning .alert-link {
  color: #533f03;
}

.alert-danger {
  color: #813838;
  background-color: #fee2e1;
  border-color: #fdd6d6;
}

.alert-danger hr {
  border-top-color: #fcbebe;
}

.alert-danger .alert-link {
  color: #5d2929;
}

.alert-light {
  color: #7e7f7f;
  background-color: #fdfdfd;
  border-color: #fcfcfc;
}

.alert-light hr {
  border-top-color: #efefef;
}

.alert-light .alert-link {
  color: #656565;
}

.alert-dark {
  color: #181b1e;
  background-color: #d5d7d8;
  border-color: #c5c6c8;
}

.alert-dark hr {
  border-top-color: #b8b9bc;
}

.alert-dark .alert-link {
  color: #010202;
}

.progress {
  background-color: #515b65;
}

.progress-bar {
  color: #fff;
  background-color: #20a8d8;
}

.list-group-item-action {
  width: 100%;
  color: #e4e7ea;
  text-align: inherit;
}

.list-group-item-action:focus,
.list-group-item-action:hover {
  color: #e4e7ea;
  text-decoration: none;
  background-color: #2f353a;
}

.list-group-item-action:active {
  color: #e4e7ea;
  background-color: #e4e7ea;
}

.list-group-item {
  background-color: #343b41;
  border: 1px solid #23282c;
}

.list-group-item.disabled,
.list-group-item:disabled {
  color: #73818f;
  background-color: #343b41;
}

.list-group-item.active {
  color: #343b41;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.list-group-item-primary {
  color: #115770;
  background-color: #c1e7f4;
}

.list-group-item-primary.list-group-item-action:focus,
.list-group-item-primary.list-group-item-action:hover {
  color: #115770;
  background-color: #abdff0;
}

.list-group-item-primary.list-group-item-action.active {
  color: #fff;
  background-color: #115770;
  border-color: #115770;
}

.list-group-item-secondary {
  color: #3c434a;
  background-color: #d8dce0;
}

.list-group-item-secondary.list-group-item-action:focus,
.list-group-item-secondary.list-group-item-action:hover {
  color: #3c434a;
  background-color: #cacfd5;
}

.list-group-item-secondary.list-group-item-action.active {
  color: #fff;
  background-color: #3c434a;
  border-color: #3c434a;
}

.list-group-item-success {
  color: #28623c;
  background-color: #cdedd8;
}

.list-group-item-success.list-group-item-action:focus,
.list-group-item-success.list-group-item-action:hover {
  color: #28623c;
  background-color: #bae6c9;
}

.list-group-item-success.list-group-item-action.active {
  color: #fff;
  background-color: #28623c;
  border-color: #28623c;
}

.list-group-item-info {
  color: #336573;
  background-color: #d3eef6;
}

.list-group-item-info.list-group-item-action:focus,
.list-group-item-info.list-group-item-action:hover {
  color: #336573;
  background-color: #bee6f2;
}

.list-group-item-info.list-group-item-action.active {
  color: #fff;
  background-color: #336573;
  border-color: #336573;
}

.list-group-item-warning {
  color: #856404;
  background-color: #ffeeba;
}

.list-group-item-warning.list-group-item-action:focus,
.list-group-item-warning.list-group-item-action:hover {
  color: #856404;
  background-color: #ffe8a1;
}

.list-group-item-warning.list-group-item-action.active {
  color: #fff;
  background-color: #856404;
  border-color: #856404;
}

.list-group-item-danger {
  color: #813838;
  background-color: #fdd6d6;
}

.list-group-item-danger.list-group-item-action:focus,
.list-group-item-danger.list-group-item-action:hover {
  color: #813838;
  background-color: #fcbebe;
}

.list-group-item-danger.list-group-item-action.active {
  color: #fff;
  background-color: #813838;
  border-color: #813838;
}

.list-group-item-light {
  color: #7e7f7f;
  background-color: #fcfcfc;
}

.list-group-item-light.list-group-item-action:focus,
.list-group-item-light.list-group-item-action:hover {
  color: #7e7f7f;
  background-color: #efefef;
}

.list-group-item-light.list-group-item-action.active {
  color: #fff;
  background-color: #7e7f7f;
  border-color: #7e7f7f;
}

.list-group-item-dark {
  color: #181b1e;
  background-color: #c5c6c8;
}

.list-group-item-dark.list-group-item-action:focus,
.list-group-item-dark.list-group-item-action:hover {
  color: #181b1e;
  background-color: #b8b9bc;
}

.list-group-item-dark.list-group-item-action.active {
  color: #fff;
  background-color: #181b1e;
  border-color: #181b1e;
}

.close {
  color: #000;
  text-shadow: 0 1px 0 #fff;
}

button.close {
  background-color: transparent;
}

.modal-content {
  background-color: #3a4149;
  border: 1px solid #23282c;
}

.modal-backdrop {
  background-color: #000;
}

.modal-header {
  border-bottom: 1px solid #23282c;
}

.tooltip .arrow:before {
  border-color: transparent;
}

.bs-tooltip-auto[x-placement^="top"] .arrow:before,
.bs-tooltip-top .arrow:before {
  border-top-color: #000;
}

.bs-tooltip-auto[x-placement^="right"] .arrow:before,
.bs-tooltip-right .arrow:before {
  border-right-color: #000;
}

.bs-tooltip-auto[x-placement^="bottom"] .arrow:before,
.bs-tooltip-bottom .arrow:before {
  border-bottom-color: #000;
}

.bs-tooltip-auto[x-placement^="left"] .arrow:before,
.bs-tooltip-left .arrow:before {
  border-left-color: #000;
}

.tooltip-inner {
  color: #fff;
  background-color: #000;
}

.popover {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.popover .arrow:after,
.popover .arrow:before {
  border-color: transparent;
}

.bs-popover-auto[x-placement^="top"] .arrow:before,
.bs-popover-top .arrow:before {
  border-top-color: rgba(0, 0, 0, 0.25);
}

.bs-popover-auto[x-placement^="top"] .arrow:after,
.bs-popover-top .arrow:after {
  border-top-color: #fff;
}

.bs-popover-auto[x-placement^="right"] .arrow:after,
.bs-popover-auto[x-placement^="right"] .arrow:before,
.bs-popover-right .arrow:after,
.bs-popover-right .arrow:before {
  border-width: 0.5rem 0.5rem 0.5rem 0;
}

.bs-popover-auto[x-placement^="right"] .arrow:before,
.bs-popover-right .arrow:before {
  border-right-color: rgba(0, 0, 0, 0.25);
}

.bs-popover-auto[x-placement^="right"] .arrow:after,
.bs-popover-right .arrow:after {
  border-right-color: #fff;
}

.bs-popover-auto[x-placement^="bottom"] .arrow:before,
.bs-popover-bottom .arrow:before {
  border-bottom-color: rgba(0, 0, 0, 0.25);
}

.bs-popover-auto[x-placement^="bottom"] .arrow:after,
.bs-popover-bottom .arrow:after {
  border-bottom-color: #fff;
}

.bs-popover-auto[x-placement^="left"] .arrow:before,
.bs-popover-left .arrow:before {
  border-left-color: rgba(0, 0, 0, 0.25);
}

.bs-popover-auto[x-placement^="left"] .arrow:after,
.bs-popover-left .arrow:after {
  border-left-color: #fff;
}

.popover-header {
  background-color: #f7f7f7;
}

.carousel-control-next-icon,
.carousel-control-prev-icon {
  background: transparent no-repeat 50%;
}

.carousel-control-prev-icon {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpbGw9JyNmZmYnIHZpZXdCb3g9JzAgMCA4IDgnPjxwYXRoIGQ9J001LjI1IDBsLTQgNCA0IDQgMS41LTEuNS0yLjUtMi41IDIuNS0yLjUtMS41LTEuNXonLz48L3N2Zz4=);
}

.carousel-control-next-icon {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpbGw9JyNmZmYnIHZpZXdCb3g9JzAgMCA4IDgnPjxwYXRoIGQ9J00yLjc1IDBsLTEuNSAxLjUgMi41IDIuNS0yLjUgMi41IDEuNSAxLjUgNC00LTQtNHonLz48L3N2Zz4=);
}

.carousel-indicators li {
  background-color: hsla(0, 0%, 100%, 0.5);
}

.carousel-indicators .active {
  background-color: #fff;
}

.bg-primary {
  background-color: #20a8d8 !important;
}

a.bg-primary:focus,
a.bg-primary:hover,
button.bg-primary:focus,
button.bg-primary:hover {
  background-color: #1985ac !important;
}

.bg-secondary {
  background-color: #73818f !important;
}

a.bg-secondary:focus,
a.bg-secondary:hover,
button.bg-secondary:focus,
button.bg-secondary:hover {
  background-color: #5c6873 !important;
}

.bg-success {
  background-color: #4dbd74 !important;
}

a.bg-success:focus,
a.bg-success:hover,
button.bg-success:focus,
button.bg-success:hover {
  background-color: #3a9d5d !important;
}

.bg-info {
  background-color: #63c2de !important;
}

a.bg-info:focus,
a.bg-info:hover,
button.bg-info:focus,
button.bg-info:hover {
  background-color: #39b2d5 !important;
}

.bg-warning {
  background-color: #ffc107 !important;
}

a.bg-warning:focus,
a.bg-warning:hover,
button.bg-warning:focus,
button.bg-warning:hover {
  background-color: #d39e00 !important;
}

.bg-danger {
  background-color: #f86c6b !important;
}

a.bg-danger:focus,
a.bg-danger:hover,
button.bg-danger:focus,
button.bg-danger:hover {
  background-color: #f63c3a !important;
}

.bg-light {
  background-color: #f3f4f5 !important;
}

a.bg-light:focus,
a.bg-light:hover,
button.bg-light:focus,
button.bg-light:hover {
  background-color: #d6dade !important;
}

.bg-dark {
  background-color: #2f353a !important;
}

a.bg-dark:focus,
a.bg-dark:hover,
button.bg-dark:focus,
button.bg-dark:hover {
  background-color: #181b1e !important;
}

.bg-transparent {
  background-color: transparent !important;
}

.border {
  border: 1px solid #23282c !important;
}

.border-top {
  border-top: 1px solid #23282c !important;
}

.border-right {
  border-right: 1px solid #23282c !important;
}

.border-bottom {
  border-bottom: 1px solid #23282c !important;
}

.border-left {
  border-left: 1px solid #23282c !important;
}

.border-primary {
  border-color: #20a8d8 !important;
}

.border-secondary {
  border-color: #73818f !important;
}

.border-success {
  border-color: #4dbd74 !important;
}

.border-info {
  border-color: #63c2de !important;
}

.border-warning {
  border-color: #ffc107 !important;
}

.border-danger {
  border-color: #f86c6b !important;
}

.border-light {
  border-color: #f3f4f5 !important;
}

.border-dark {
  border-color: #2f353a !important;
}

.border-white {
  border-color: #fff !important;
}

.sr-only {
  clip: rect(0, 0, 0, 0);
}

.shadow-sm {
  -webkit-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.shadow {
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.shadow-lg {
  -webkit-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.text-white {
  color: #fff !important;
}

.text-primary {
  color: #20a8d8 !important;
}

a.text-primary:focus,
a.text-primary:hover {
  color: #1985ac !important;
}

.text-secondary {
  color: #73818f !important;
}

a.text-secondary:focus,
a.text-secondary:hover {
  color: #5c6873 !important;
}

.text-success {
  color: #4dbd74 !important;
}

a.text-success:focus,
a.text-success:hover {
  color: #3a9d5d !important;
}

.text-info {
  color: #63c2de !important;
}

a.text-info:focus,
a.text-info:hover {
  color: #39b2d5 !important;
}

.text-warning {
  color: #ffc107 !important;
}

a.text-warning:focus,
a.text-warning:hover {
  color: #d39e00 !important;
}

.text-danger {
  color: #f86c6b !important;
}

a.text-danger:focus,
a.text-danger:hover {
  color: #f63c3a !important;
}

.text-light {
  color: #f3f4f5 !important;
}

a.text-light:focus,
a.text-light:hover {
  color: #d6dade !important;
}

.text-dark {
  color: #2f353a !important;
}

a.text-dark:focus,
a.text-dark:hover {
  color: #181b1e !important;
}

.text-body {
  color: #e4e7ea !important;
}

.text-muted {
  color: #73818f !important;
}

.text-black-50 {
  color: rgba(0, 0, 0, 0.5) !important;
}

.text-white-50 {
  color: hsla(0, 0%, 100%, 0.5) !important;
}

.text-hide {
  background-color: transparent;
}

.ps--active-x > .ps__rail-x,
.ps--active-y > .ps__rail-y {
  background-color: transparent;
}

.ps__rail-x:focus,
.ps__rail-x:hover,
.ps__rail-y:focus,
.ps__rail-y:hover {
  background-color: #eee;
}

.ps__thumb-x {
  -webkit-transition: background-color 0.2s linear, height 0.2s ease-in-out;
  transition: background-color 0.2s linear, height 0.2s ease-in-out;
}

.ps__thumb-x,
.ps__thumb-y {
  background-color: #aaa;
}

.ps__thumb-y {
  -webkit-transition: background-color 0.2s linear, width 0.2s ease-in-out;
  transition: background-color 0.2s linear, width 0.2s ease-in-out;
}

.ps__rail-x:focus > .ps__thumb-x,
.ps__rail-x:hover > .ps__thumb-x {
  background-color: #999;
}

.ps__rail-y:focus > .ps__thumb-y,
.ps__rail-y:hover > .ps__thumb-y {
  background-color: #999;
}

.aside-menu {
  color: #f3f4f5;
  background: #3a4149;
  border-left: 1px solid #23282c;
}

.aside-menu .nav-tabs {
  border-color: #23282c;
}

.aside-menu .nav-tabs .nav-link {
  color: #e4e7ea;
}

.aside-menu .nav-tabs .nav-link.active {
  color: #20a8d8;
  border-right-color: #23282c;
  border-left-color: #23282c;
}

.aside-menu .tab-content {
  border-top: 1px solid #23282c;
}

.aside-menu .tab-content::-webkit-scrollbar-track {
  background-color: #454e57;
  border-right: 1px solid #2f353a;
  border-left: 1px solid #2f353a;
}

.aside-menu .tab-content::-webkit-scrollbar-thumb {
  background-color: #23282c;
}

.avatar .avatar-status {
  border: 1px solid #3a4149;
}

.avatar-lg .avatar-status {
  border: 1px solid #3a4149;
}

.avatar-sm .avatar-status {
  border: 1px solid #3a4149;
}

.avatar-xs .avatar-status {
  border: 1px solid #3a4149;
}

.breadcrumb-menu .btn {
  color: #f3f4f5;
}

.breadcrumb {
  border-bottom: 1px solid #23282c;
}

.brand-card {
  background-color: #3a4149;
  border: 1px solid #23282c;
}

.brand-card-header i {
  color: #fff;
}

.brand-card-body > :not(:last-child) {
  border-right: 1px solid #23282c;
}

[dir="rtl"] .brand-card-body > :not(:last-child) {
  border-left: 1px solid #23282c;
}

.btn-brand i {
  background-color: rgba(0, 0, 0, 0.2);
}

.btn-facebook {
  color: #fff;
  background-color: #3b5998;
  border-color: #3b5998;
}

.btn-facebook:hover {
  color: #fff;
  background-color: #30497c;
  border-color: #2d4373;
}

.btn-facebook.focus,
.btn-facebook:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(59, 89, 152, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(59, 89, 152, 0.5);
}

.btn-facebook.disabled,
.btn-facebook:disabled {
  color: #fff;
  background-color: #3b5998;
  border-color: #3b5998;
}

.btn-facebook:not(:disabled):not(.disabled).active,
.btn-facebook:not(:disabled):not(.disabled):active,
.show > .btn-facebook.dropdown-toggle {
  color: #fff;
  background-color: #2d4373;
  border-color: #293e6a;
}

.btn-facebook:not(:disabled):not(.disabled).active:focus,
.btn-facebook:not(:disabled):not(.disabled):active:focus,
.show > .btn-facebook.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(59, 89, 152, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(59, 89, 152, 0.5);
}

.btn-twitter {
  color: #fff;
  background-color: #00aced;
  border-color: #00aced;
}

.btn-twitter:hover {
  color: #fff;
  background-color: #0090c7;
  border-color: #0087ba;
}

.btn-twitter.focus,
.btn-twitter:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 172, 237, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(0, 172, 237, 0.5);
}

.btn-twitter.disabled,
.btn-twitter:disabled {
  color: #fff;
  background-color: #00aced;
  border-color: #00aced;
}

.btn-twitter:not(:disabled):not(.disabled).active,
.btn-twitter:not(:disabled):not(.disabled):active,
.show > .btn-twitter.dropdown-toggle {
  color: #fff;
  background-color: #0087ba;
  border-color: #007ead;
}

.btn-twitter:not(:disabled):not(.disabled).active:focus,
.btn-twitter:not(:disabled):not(.disabled):active:focus,
.show > .btn-twitter.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 172, 237, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(0, 172, 237, 0.5);
}

.btn-linkedin {
  color: #fff;
  background-color: #4875b4;
  border-color: #4875b4;
}

.btn-linkedin:hover {
  color: #fff;
  background-color: #3d6399;
  border-color: #395d90;
}

.btn-linkedin.focus,
.btn-linkedin:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(72, 117, 180, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(72, 117, 180, 0.5);
}

.btn-linkedin.disabled,
.btn-linkedin:disabled {
  color: #fff;
  background-color: #4875b4;
  border-color: #4875b4;
}

.btn-linkedin:not(:disabled):not(.disabled).active,
.btn-linkedin:not(:disabled):not(.disabled):active,
.show > .btn-linkedin.dropdown-toggle {
  color: #fff;
  background-color: #395d90;
  border-color: #365786;
}

.btn-linkedin:not(:disabled):not(.disabled).active:focus,
.btn-linkedin:not(:disabled):not(.disabled):active:focus,
.show > .btn-linkedin.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(72, 117, 180, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(72, 117, 180, 0.5);
}

.btn-google-plus {
  color: #fff;
  background-color: #d34836;
  border-color: #d34836;
}

.btn-google-plus:hover {
  color: #fff;
  background-color: #ba3929;
  border-color: #b03626;
}

.btn-google-plus.focus,
.btn-google-plus:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(211, 72, 54, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(211, 72, 54, 0.5);
}

.btn-google-plus.disabled,
.btn-google-plus:disabled {
  color: #fff;
  background-color: #d34836;
  border-color: #d34836;
}

.btn-google-plus:not(:disabled):not(.disabled).active,
.btn-google-plus:not(:disabled):not(.disabled):active,
.show > .btn-google-plus.dropdown-toggle {
  color: #fff;
  background-color: #b03626;
  border-color: #a53324;
}

.btn-google-plus:not(:disabled):not(.disabled).active:focus,
.btn-google-plus:not(:disabled):not(.disabled):active:focus,
.show > .btn-google-plus.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(211, 72, 54, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(211, 72, 54, 0.5);
}

.btn-flickr {
  color: #fff;
  background-color: #ff0084;
  border-color: #ff0084;
}

.btn-flickr:hover {
  color: #fff;
  background-color: #d90070;
  border-color: #cc006a;
}

.btn-flickr.focus,
.btn-flickr:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 0, 132, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 132, 0.5);
}

.btn-flickr.disabled,
.btn-flickr:disabled {
  color: #fff;
  background-color: #ff0084;
  border-color: #ff0084;
}

.btn-flickr:not(:disabled):not(.disabled).active,
.btn-flickr:not(:disabled):not(.disabled):active,
.show > .btn-flickr.dropdown-toggle {
  color: #fff;
  background-color: #cc006a;
  border-color: #bf0063;
}

.btn-flickr:not(:disabled):not(.disabled).active:focus,
.btn-flickr:not(:disabled):not(.disabled):active:focus,
.show > .btn-flickr.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 0, 132, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 132, 0.5);
}

.btn-tumblr {
  color: #fff;
  background-color: #32506d;
  border-color: #32506d;
}

.btn-tumblr:hover {
  color: #fff;
  background-color: #263d53;
  border-color: #22364a;
}

.btn-tumblr.focus,
.btn-tumblr:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(50, 80, 109, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(50, 80, 109, 0.5);
}

.btn-tumblr.disabled,
.btn-tumblr:disabled {
  color: #fff;
  background-color: #32506d;
  border-color: #32506d;
}

.btn-tumblr:not(:disabled):not(.disabled).active,
.btn-tumblr:not(:disabled):not(.disabled):active,
.show > .btn-tumblr.dropdown-toggle {
  color: #fff;
  background-color: #22364a;
  border-color: #1e3041;
}

.btn-tumblr:not(:disabled):not(.disabled).active:focus,
.btn-tumblr:not(:disabled):not(.disabled):active:focus,
.show > .btn-tumblr.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(50, 80, 109, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(50, 80, 109, 0.5);
}

.btn-xing {
  color: #fff;
  background-color: #026466;
  border-color: #026466;
}

.btn-xing:hover {
  color: #fff;
  background-color: #013f40;
  border-color: #013334;
}

.btn-xing.focus,
.btn-xing:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(2, 100, 102, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(2, 100, 102, 0.5);
}

.btn-xing.disabled,
.btn-xing:disabled {
  color: #fff;
  background-color: #026466;
  border-color: #026466;
}

.btn-xing:not(:disabled):not(.disabled).active,
.btn-xing:not(:disabled):not(.disabled):active,
.show > .btn-xing.dropdown-toggle {
  color: #fff;
  background-color: #013334;
  border-color: #012727;
}

.btn-xing:not(:disabled):not(.disabled).active:focus,
.btn-xing:not(:disabled):not(.disabled):active:focus,
.show > .btn-xing.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(2, 100, 102, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(2, 100, 102, 0.5);
}

.btn-github {
  color: #fff;
  background-color: #4183c4;
  border-color: #4183c4;
}

.btn-github:hover {
  color: #fff;
  background-color: #3570aa;
  border-color: #3269a0;
}

.btn-github.focus,
.btn-github:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(65, 131, 196, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(65, 131, 196, 0.5);
}

.btn-github.disabled,
.btn-github:disabled {
  color: #fff;
  background-color: #4183c4;
  border-color: #4183c4;
}

.btn-github:not(:disabled):not(.disabled).active,
.btn-github:not(:disabled):not(.disabled):active,
.show > .btn-github.dropdown-toggle {
  color: #fff;
  background-color: #3269a0;
  border-color: #2f6397;
}

.btn-github:not(:disabled):not(.disabled).active:focus,
.btn-github:not(:disabled):not(.disabled):active:focus,
.show > .btn-github.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(65, 131, 196, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(65, 131, 196, 0.5);
}

.btn-html5 {
  color: #fff;
  background-color: #e34f26;
  border-color: #e34f26;
}

.btn-html5:hover {
  color: #fff;
  background-color: #c9401a;
  border-color: #be3c18;
}

.btn-html5.focus,
.btn-html5:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(227, 79, 38, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(227, 79, 38, 0.5);
}

.btn-html5.disabled,
.btn-html5:disabled {
  color: #fff;
  background-color: #e34f26;
  border-color: #e34f26;
}

.btn-html5:not(:disabled):not(.disabled).active,
.btn-html5:not(:disabled):not(.disabled):active,
.show > .btn-html5.dropdown-toggle {
  color: #fff;
  background-color: #be3c18;
  border-color: #b23917;
}

.btn-html5:not(:disabled):not(.disabled).active:focus,
.btn-html5:not(:disabled):not(.disabled):active:focus,
.show > .btn-html5.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(227, 79, 38, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(227, 79, 38, 0.5);
}

.btn-openid {
  color: #23282c;
  background-color: #f78c40;
  border-color: #f78c40;
}

.btn-openid:hover {
  color: #fff;
  background-color: #f5761b;
  border-color: #f56f0f;
}

.btn-openid.focus,
.btn-openid:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(247, 140, 64, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(247, 140, 64, 0.5);
}

.btn-openid.disabled,
.btn-openid:disabled {
  color: #23282c;
  background-color: #f78c40;
  border-color: #f78c40;
}

.btn-openid:not(:disabled):not(.disabled).active,
.btn-openid:not(:disabled):not(.disabled):active,
.show > .btn-openid.dropdown-toggle {
  color: #fff;
  background-color: #f56f0f;
  border-color: #ed680a;
}

.btn-openid:not(:disabled):not(.disabled).active:focus,
.btn-openid:not(:disabled):not(.disabled):active:focus,
.show > .btn-openid.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(247, 140, 64, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(247, 140, 64, 0.5);
}

.btn-stack-overflow {
  color: #fff;
  background-color: #fe7a15;
  border-color: #fe7a15;
}

.btn-stack-overflow:hover {
  color: #fff;
  background-color: #ec6701;
  border-color: #df6101;
}

.btn-stack-overflow.focus,
.btn-stack-overflow:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(254, 122, 21, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(254, 122, 21, 0.5);
}

.btn-stack-overflow.disabled,
.btn-stack-overflow:disabled {
  color: #fff;
  background-color: #fe7a15;
  border-color: #fe7a15;
}

.btn-stack-overflow:not(:disabled):not(.disabled).active,
.btn-stack-overflow:not(:disabled):not(.disabled):active,
.show > .btn-stack-overflow.dropdown-toggle {
  color: #fff;
  background-color: #df6101;
  border-color: #d25c01;
}

.btn-stack-overflow:not(:disabled):not(.disabled).active:focus,
.btn-stack-overflow:not(:disabled):not(.disabled):active:focus,
.show > .btn-stack-overflow.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(254, 122, 21, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(254, 122, 21, 0.5);
}

.btn-youtube {
  color: #fff;
  background-color: #b00;
  border-color: #b00;
}

.btn-youtube:hover {
  color: #fff;
  background-color: #950000;
  border-color: #800;
}

.btn-youtube.focus,
.btn-youtube:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(187, 0, 0, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(187, 0, 0, 0.5);
}

.btn-youtube.disabled,
.btn-youtube:disabled {
  color: #fff;
  background-color: #b00;
  border-color: #b00;
}

.btn-youtube:not(:disabled):not(.disabled).active,
.btn-youtube:not(:disabled):not(.disabled):active,
.show > .btn-youtube.dropdown-toggle {
  color: #fff;
  background-color: #800;
  border-color: #7b0000;
}

.btn-youtube:not(:disabled):not(.disabled).active:focus,
.btn-youtube:not(:disabled):not(.disabled):active:focus,
.show > .btn-youtube.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(187, 0, 0, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(187, 0, 0, 0.5);
}

.btn-css3 {
  color: #fff;
  background-color: #0170ba;
  border-color: #0170ba;
}

.btn-css3:hover {
  color: #fff;
  background-color: #015994;
  border-color: #015187;
}

.btn-css3.focus,
.btn-css3:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(1, 112, 186, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(1, 112, 186, 0.5);
}

.btn-css3.disabled,
.btn-css3:disabled {
  color: #fff;
  background-color: #0170ba;
  border-color: #0170ba;
}

.btn-css3:not(:disabled):not(.disabled).active,
.btn-css3:not(:disabled):not(.disabled):active,
.show > .btn-css3.dropdown-toggle {
  color: #fff;
  background-color: #015187;
  border-color: #014a7b;
}

.btn-css3:not(:disabled):not(.disabled).active:focus,
.btn-css3:not(:disabled):not(.disabled):active:focus,
.show > .btn-css3.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(1, 112, 186, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(1, 112, 186, 0.5);
}

.btn-dribbble {
  color: #fff;
  background-color: #ea4c89;
  border-color: #ea4c89;
}

.btn-dribbble:hover {
  color: #fff;
  background-color: #e62a72;
  border-color: #e51e6b;
}

.btn-dribbble.focus,
.btn-dribbble:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(234, 76, 137, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(234, 76, 137, 0.5);
}

.btn-dribbble.disabled,
.btn-dribbble:disabled {
  color: #fff;
  background-color: #ea4c89;
  border-color: #ea4c89;
}

.btn-dribbble:not(:disabled):not(.disabled).active,
.btn-dribbble:not(:disabled):not(.disabled):active,
.show > .btn-dribbble.dropdown-toggle {
  color: #fff;
  background-color: #e51e6b;
  border-color: #dc1a65;
}

.btn-dribbble:not(:disabled):not(.disabled).active:focus,
.btn-dribbble:not(:disabled):not(.disabled):active:focus,
.show > .btn-dribbble.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(234, 76, 137, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(234, 76, 137, 0.5);
}

.btn-instagram {
  color: #fff;
  background-color: #517fa4;
  border-color: #517fa4;
}

.btn-instagram:hover {
  color: #fff;
  background-color: #446b8a;
  border-color: #406582;
}

.btn-instagram.focus,
.btn-instagram:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(81, 127, 164, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(81, 127, 164, 0.5);
}

.btn-instagram.disabled,
.btn-instagram:disabled {
  color: #fff;
  background-color: #517fa4;
  border-color: #517fa4;
}

.btn-instagram:not(:disabled):not(.disabled).active,
.btn-instagram:not(:disabled):not(.disabled):active,
.show > .btn-instagram.dropdown-toggle {
  color: #fff;
  background-color: #406582;
  border-color: #3c5e79;
}

.btn-instagram:not(:disabled):not(.disabled).active:focus,
.btn-instagram:not(:disabled):not(.disabled):active:focus,
.show > .btn-instagram.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(81, 127, 164, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(81, 127, 164, 0.5);
}

.btn-pinterest {
  color: #fff;
  background-color: #cb2027;
  border-color: #cb2027;
}

.btn-pinterest:hover {
  color: #fff;
  background-color: #aa1b21;
  border-color: #9f191f;
}

.btn-pinterest.focus,
.btn-pinterest:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(203, 32, 39, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(203, 32, 39, 0.5);
}

.btn-pinterest.disabled,
.btn-pinterest:disabled {
  color: #fff;
  background-color: #cb2027;
  border-color: #cb2027;
}

.btn-pinterest:not(:disabled):not(.disabled).active,
.btn-pinterest:not(:disabled):not(.disabled):active,
.show > .btn-pinterest.dropdown-toggle {
  color: #fff;
  background-color: #9f191f;
  border-color: #94171c;
}

.btn-pinterest:not(:disabled):not(.disabled).active:focus,
.btn-pinterest:not(:disabled):not(.disabled):active:focus,
.show > .btn-pinterest.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(203, 32, 39, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(203, 32, 39, 0.5);
}

.btn-vk {
  color: #fff;
  background-color: #45668e;
  border-color: #45668e;
}

.btn-vk:hover {
  color: #fff;
  background-color: #385474;
  border-color: #344d6c;
}

.btn-vk.focus,
.btn-vk:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(69, 102, 142, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(69, 102, 142, 0.5);
}

.btn-vk.disabled,
.btn-vk:disabled {
  color: #fff;
  background-color: #45668e;
  border-color: #45668e;
}

.btn-vk:not(:disabled):not(.disabled).active,
.btn-vk:not(:disabled):not(.disabled):active,
.show > .btn-vk.dropdown-toggle {
  color: #fff;
  background-color: #344d6c;
  border-color: #304763;
}

.btn-vk:not(:disabled):not(.disabled).active:focus,
.btn-vk:not(:disabled):not(.disabled):active:focus,
.show > .btn-vk.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(69, 102, 142, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(69, 102, 142, 0.5);
}

.btn-yahoo {
  color: #fff;
  background-color: #400191;
  border-color: #400191;
}

.btn-yahoo:hover {
  color: #fff;
  background-color: #2f016b;
  border-color: #2a015e;
}

.btn-yahoo.focus,
.btn-yahoo:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(64, 1, 145, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(64, 1, 145, 0.5);
}

.btn-yahoo.disabled,
.btn-yahoo:disabled {
  color: #fff;
  background-color: #400191;
  border-color: #400191;
}

.btn-yahoo:not(:disabled):not(.disabled).active,
.btn-yahoo:not(:disabled):not(.disabled):active,
.show > .btn-yahoo.dropdown-toggle {
  color: #fff;
  background-color: #2a015e;
  border-color: #240152;
}

.btn-yahoo:not(:disabled):not(.disabled).active:focus,
.btn-yahoo:not(:disabled):not(.disabled):active:focus,
.show > .btn-yahoo.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(64, 1, 145, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(64, 1, 145, 0.5);
}

.btn-behance {
  color: #fff;
  background-color: #1769ff;
  border-color: #1769ff;
}

.btn-behance:hover {
  color: #fff;
  background-color: #0055f0;
  border-color: #0050e3;
}

.btn-behance.focus,
.btn-behance:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(23, 105, 255, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(23, 105, 255, 0.5);
}

.btn-behance.disabled,
.btn-behance:disabled {
  color: #fff;
  background-color: #1769ff;
  border-color: #1769ff;
}

.btn-behance:not(:disabled):not(.disabled).active,
.btn-behance:not(:disabled):not(.disabled):active,
.show > .btn-behance.dropdown-toggle {
  color: #fff;
  background-color: #0050e3;
  border-color: #004cd6;
}

.btn-behance:not(:disabled):not(.disabled).active:focus,
.btn-behance:not(:disabled):not(.disabled):active:focus,
.show > .btn-behance.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(23, 105, 255, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(23, 105, 255, 0.5);
}

.btn-dropbox {
  color: #fff;
  background-color: #007ee5;
  border-color: #007ee5;
}

.btn-dropbox:hover {
  color: #fff;
  background-color: #0069bf;
  border-color: #0062b2;
}

.btn-dropbox.focus,
.btn-dropbox:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 126, 229, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(0, 126, 229, 0.5);
}

.btn-dropbox.disabled,
.btn-dropbox:disabled {
  color: #fff;
  background-color: #007ee5;
  border-color: #007ee5;
}

.btn-dropbox:not(:disabled):not(.disabled).active,
.btn-dropbox:not(:disabled):not(.disabled):active,
.show > .btn-dropbox.dropdown-toggle {
  color: #fff;
  background-color: #0062b2;
  border-color: #005ba5;
}

.btn-dropbox:not(:disabled):not(.disabled).active:focus,
.btn-dropbox:not(:disabled):not(.disabled):active:focus,
.show > .btn-dropbox.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 126, 229, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(0, 126, 229, 0.5);
}

.btn-reddit {
  color: #fff;
  background-color: #ff4500;
  border-color: #ff4500;
}

.btn-reddit:hover {
  color: #fff;
  background-color: #d93b00;
  border-color: #cc3700;
}

.btn-reddit.focus,
.btn-reddit:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 69, 0, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 69, 0, 0.5);
}

.btn-reddit.disabled,
.btn-reddit:disabled {
  color: #fff;
  background-color: #ff4500;
  border-color: #ff4500;
}

.btn-reddit:not(:disabled):not(.disabled).active,
.btn-reddit:not(:disabled):not(.disabled):active,
.show > .btn-reddit.dropdown-toggle {
  color: #fff;
  background-color: #cc3700;
  border-color: #bf3400;
}

.btn-reddit:not(:disabled):not(.disabled).active:focus,
.btn-reddit:not(:disabled):not(.disabled):active:focus,
.show > .btn-reddit.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 69, 0, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 69, 0, 0.5);
}

.btn-spotify {
  color: #fff;
  background-color: #7ab800;
  border-color: #7ab800;
}

.btn-spotify:hover {
  color: #fff;
  background-color: #619200;
  border-color: #588500;
}

.btn-spotify.focus,
.btn-spotify:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(122, 184, 0, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(122, 184, 0, 0.5);
}

.btn-spotify.disabled,
.btn-spotify:disabled {
  color: #fff;
  background-color: #7ab800;
  border-color: #7ab800;
}

.btn-spotify:not(:disabled):not(.disabled).active,
.btn-spotify:not(:disabled):not(.disabled):active,
.show > .btn-spotify.dropdown-toggle {
  color: #fff;
  background-color: #588500;
  border-color: #507800;
}

.btn-spotify:not(:disabled):not(.disabled).active:focus,
.btn-spotify:not(:disabled):not(.disabled):active:focus,
.show > .btn-spotify.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(122, 184, 0, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(122, 184, 0, 0.5);
}

.btn-vine {
  color: #fff;
  background-color: #00bf8f;
  border-color: #00bf8f;
}

.btn-vine:hover {
  color: #fff;
  background-color: #009972;
  border-color: #008c69;
}

.btn-vine.focus,
.btn-vine:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 191, 143, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(0, 191, 143, 0.5);
}

.btn-vine.disabled,
.btn-vine:disabled {
  color: #fff;
  background-color: #00bf8f;
  border-color: #00bf8f;
}

.btn-vine:not(:disabled):not(.disabled).active,
.btn-vine:not(:disabled):not(.disabled):active,
.show > .btn-vine.dropdown-toggle {
  color: #fff;
  background-color: #008c69;
  border-color: #007f5f;
}

.btn-vine:not(:disabled):not(.disabled).active:focus,
.btn-vine:not(:disabled):not(.disabled):active:focus,
.show > .btn-vine.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 191, 143, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(0, 191, 143, 0.5);
}

.btn-foursquare {
  color: #fff;
  background-color: #1073af;
  border-color: #1073af;
}

.btn-foursquare:hover {
  color: #fff;
  background-color: #0d5c8c;
  border-color: #0c5480;
}

.btn-foursquare.focus,
.btn-foursquare:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(16, 115, 175, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(16, 115, 175, 0.5);
}

.btn-foursquare.disabled,
.btn-foursquare:disabled {
  color: #fff;
  background-color: #1073af;
  border-color: #1073af;
}

.btn-foursquare:not(:disabled):not(.disabled).active,
.btn-foursquare:not(:disabled):not(.disabled):active,
.show > .btn-foursquare.dropdown-toggle {
  color: #fff;
  background-color: #0c5480;
  border-color: #0b4d75;
}

.btn-foursquare:not(:disabled):not(.disabled).active:focus,
.btn-foursquare:not(:disabled):not(.disabled):active:focus,
.show > .btn-foursquare.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(16, 115, 175, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(16, 115, 175, 0.5);
}

.btn-vimeo {
  color: #23282c;
  background-color: #aad450;
  border-color: #aad450;
}

.btn-vimeo:hover {
  color: #23282c;
  background-color: #9bcc32;
  border-color: #93c130;
}

.btn-vimeo.focus,
.btn-vimeo:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(170, 212, 80, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(170, 212, 80, 0.5);
}

.btn-vimeo.disabled,
.btn-vimeo:disabled {
  color: #23282c;
  background-color: #aad450;
  border-color: #aad450;
}

.btn-vimeo:not(:disabled):not(.disabled).active,
.btn-vimeo:not(:disabled):not(.disabled):active,
.show > .btn-vimeo.dropdown-toggle {
  color: #23282c;
  background-color: #93c130;
  border-color: #8bb72d;
}

.btn-vimeo:not(:disabled):not(.disabled).active:focus,
.btn-vimeo:not(:disabled):not(.disabled):active:focus,
.show > .btn-vimeo.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(170, 212, 80, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(170, 212, 80, 0.5);
}

.btn-transparent {
  color: #fff;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-primary {
  color: #20a8d8;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-primary:hover {
  color: #fff;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.btn-ghost-primary.focus,
.btn-ghost-primary:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
}

.btn-ghost-primary.disabled,
.btn-ghost-primary:disabled {
  color: #20a8d8;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-primary:not(:disabled):not(.disabled).active,
.btn-ghost-primary:not(:disabled):not(.disabled):active,
.show > .btn-ghost-primary.dropdown-toggle {
  color: #fff;
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.btn-ghost-primary:not(:disabled):not(.disabled).active:focus,
.btn-ghost-primary:not(:disabled):not(.disabled):active:focus,
.show > .btn-ghost-primary.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.5);
}

.btn-ghost-secondary {
  color: #73818f;
  background-color: transparent;
  background-image: none;
  border-color: transparent;
}

.btn-ghost-secondary:hover {
  color: #fff;
  background-color: #73818f;
  border-color: #73818f;
}

.btn-ghost-secondary.focus,
.btn-ghost-secondary:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
}

.btn-ghost-secondary.disabled,
.btn-ghost-secondary:disabled {
  color: #73818f;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-secondary:not(:disabled):not(.disabled).active,
.btn-ghost-secondary:not(:disabled):not(.disabled):active,
.show > .btn-ghost-secondary.dropdown-toggle {
  color: #fff;
  background-color: #73818f;
  border-color: #73818f;
}

.btn-ghost-secondary:not(:disabled):not(.disabled).active:focus,
.btn-ghost-secondary:not(:disabled):not(.disabled):active:focus,
.show > .btn-ghost-secondary.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(115, 129, 143, 0.5);
}

.btn-ghost-success {
  color: #4dbd74;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-success:hover {
  color: #fff;
  background-color: #4dbd74;
  border-color: #4dbd74;
}

.btn-ghost-success.focus,
.btn-ghost-success:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
}

.btn-ghost-success.disabled,
.btn-ghost-success:disabled {
  color: #4dbd74;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-success:not(:disabled):not(.disabled).active,
.btn-ghost-success:not(:disabled):not(.disabled):active,
.show > .btn-ghost-success.dropdown-toggle {
  color: #fff;
  background-color: #4dbd74;
  border-color: #4dbd74;
}

.btn-ghost-success:not(:disabled):not(.disabled).active:focus,
.btn-ghost-success:not(:disabled):not(.disabled):active:focus,
.show > .btn-ghost-success.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(77, 189, 116, 0.5);
}

.btn-ghost-info {
  color: #63c2de;
  background-color: transparent;
  background-image: none;
  border-color: transparent;
}

.btn-ghost-info:hover {
  color: #23282c;
  background-color: #63c2de;
  border-color: #63c2de;
}

.btn-ghost-info.focus,
.btn-ghost-info:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
}

.btn-ghost-info.disabled,
.btn-ghost-info:disabled {
  color: #63c2de;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-info:not(:disabled):not(.disabled).active,
.btn-ghost-info:not(:disabled):not(.disabled):active,
.show > .btn-ghost-info.dropdown-toggle {
  color: #23282c;
  background-color: #63c2de;
  border-color: #63c2de;
}

.btn-ghost-info:not(:disabled):not(.disabled).active:focus,
.btn-ghost-info:not(:disabled):not(.disabled):active:focus,
.show > .btn-ghost-info.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(99, 194, 222, 0.5);
}

.btn-ghost-warning {
  color: #ffc107;
  background-color: transparent;
  background-image: none;
  border-color: transparent;
}

.btn-ghost-warning:hover {
  color: #23282c;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-ghost-warning.focus,
.btn-ghost-warning:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-ghost-warning.disabled,
.btn-ghost-warning:disabled {
  color: #ffc107;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-warning:not(:disabled):not(.disabled).active,
.btn-ghost-warning:not(:disabled):not(.disabled):active,
.show > .btn-ghost-warning.dropdown-toggle {
  color: #23282c;
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-ghost-warning:not(:disabled):not(.disabled).active:focus,
.btn-ghost-warning:not(:disabled):not(.disabled):active:focus,
.show > .btn-ghost-warning.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
}

.btn-ghost-danger {
  color: #f86c6b;
  background-color: transparent;
  background-image: none;
  border-color: transparent;
}

.btn-ghost-danger:hover {
  color: #fff;
  background-color: #f86c6b;
  border-color: #f86c6b;
}

.btn-ghost-danger.focus,
.btn-ghost-danger:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
}

.btn-ghost-danger.disabled,
.btn-ghost-danger:disabled {
  color: #f86c6b;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-danger:not(:disabled):not(.disabled).active,
.btn-ghost-danger:not(:disabled):not(.disabled):active,
.show > .btn-ghost-danger.dropdown-toggle {
  color: #fff;
  background-color: #f86c6b;
  border-color: #f86c6b;
}

.btn-ghost-danger:not(:disabled):not(.disabled).active:focus,
.btn-ghost-danger:not(:disabled):not(.disabled):active:focus,
.show > .btn-ghost-danger.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(248, 108, 107, 0.5);
}

.btn-ghost-light {
  color: #f3f4f5;
  background-color: transparent;
  background-image: none;
  border-color: transparent;
}

.btn-ghost-light:hover {
  color: #23282c;
  background-color: #f3f4f5;
  border-color: #f3f4f5;
}

.btn-ghost-light.focus,
.btn-ghost-light:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
}

.btn-ghost-light.disabled,
.btn-ghost-light:disabled {
  color: #f3f4f5;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-light:not(:disabled):not(.disabled).active,
.btn-ghost-light:not(:disabled):not(.disabled):active,
.show > .btn-ghost-light.dropdown-toggle {
  color: #23282c;
  background-color: #f3f4f5;
  border-color: #f3f4f5;
}

.btn-ghost-light:not(:disabled):not(.disabled).active:focus,
.btn-ghost-light:not(:disabled):not(.disabled):active:focus,
.show > .btn-ghost-light.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(243, 244, 245, 0.5);
}

.btn-ghost-dark {
  color: #2f353a;
  background-color: transparent;
  background-image: none;
  border-color: transparent;
}

.btn-ghost-dark:hover {
  color: #fff;
  background-color: #2f353a;
  border-color: #2f353a;
}

.btn-ghost-dark.focus,
.btn-ghost-dark:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
}

.btn-ghost-dark.disabled,
.btn-ghost-dark:disabled {
  color: #2f353a;
  background-color: transparent;
  border-color: transparent;
}

.btn-ghost-dark:not(:disabled):not(.disabled).active,
.btn-ghost-dark:not(:disabled):not(.disabled):active,
.show > .btn-ghost-dark.dropdown-toggle {
  color: #fff;
  background-color: #2f353a;
  border-color: #2f353a;
}

.btn-ghost-dark:not(:disabled):not(.disabled).active:focus,
.btn-ghost-dark:not(:disabled):not(.disabled):active:focus,
.show > .btn-ghost-dark.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
  box-shadow: 0 0 0 0.2rem rgba(47, 53, 58, 0.5);
}

.callout {
  border-left: 4px solid #23282c;
}

.callout-bordered {
  border: 1px solid #23282c;
}

.callout-primary {
  border-left-color: #20a8d8;
}

.callout-primary h4 {
  color: #20a8d8;
}

.callout-secondary {
  border-left-color: #73818f;
}

.callout-secondary h4 {
  color: #73818f;
}

.callout-success {
  border-left-color: #4dbd74;
}

.callout-success h4 {
  color: #4dbd74;
}

.callout-info {
  border-left-color: #63c2de;
}

.callout-info h4 {
  color: #63c2de;
}

.callout-warning {
  border-left-color: #ffc107;
}

.callout-warning h4 {
  color: #ffc107;
}

.callout-danger {
  border-left-color: #f86c6b;
}

.callout-danger h4 {
  color: #f86c6b;
}

.callout-light {
  border-left-color: #f3f4f5;
}

.callout-light h4 {
  color: #f3f4f5;
}

.callout-dark {
  border-left-color: #2f353a;
}

.callout-dark h4 {
  color: #2f353a;
}

[dir="rtl"] .callout {
  border-right: 4px solid #23282c;
}

[dir="rtl"] .callout.callout-primary {
  border-right-color: #20a8d8;
}

[dir="rtl"] .callout.callout-secondary {
  border-right-color: #73818f;
}

[dir="rtl"] .callout.callout-success {
  border-right-color: #4dbd74;
}

[dir="rtl"] .callout.callout-info {
  border-right-color: #63c2de;
}

[dir="rtl"] .callout.callout-warning {
  border-right-color: #ffc107;
}

[dir="rtl"] .callout.callout-danger {
  border-right-color: #f86c6b;
}

[dir="rtl"] .callout.callout-light {
  border-right-color: #f3f4f5;
}

[dir="rtl"] .callout.callout-dark {
  border-right-color: #2f353a;
}

.card.bg-primary {
  border-color: #187da0;
}

.card.bg-primary .card-header {
  background-color: #1e9ecb;
  border-color: #187da0;
}

.card.bg-secondary {
  border-color: #56616c;
}

.card.bg-secondary .card-header {
  background-color: #6c7987;
  border-color: #56616c;
}

.card.bg-success {
  border-color: #379457;
}

.card.bg-success .card-header {
  background-color: #44b76c;
  border-color: #379457;
}

.card.bg-info {
  border-color: #2eadd3;
}

.card.bg-info .card-header {
  background-color: #56bddb;
  border-color: #2eadd3;
}

.card.bg-warning {
  border-color: #c69500;
}

.card.bg-warning .card-header {
  background-color: #f7b900;
  border-color: #c69500;
}

.card.bg-danger {
  border-color: #f5302e;
}

.card.bg-danger .card-header {
  background-color: #f75d5c;
  border-color: #f5302e;
}

.card.bg-light {
  border-color: #cfd4d9;
}

.card.bg-light .card-header {
  background-color: #eaecee;
  border-color: #cfd4d9;
}

.card.bg-dark {
  border-color: #121517;
}

.card.bg-dark .card-header {
  background-color: #282d32;
  border-color: #121517;
}

.card-placeholder {
  border: 1px dashed #c8ced3;
}

.card-header .nav-tabs .nav-link {
  color: #73818f;
}

.card-header .nav-tabs .nav-link.active {
  color: #e4e7ea;
  background: #fff;
}

.card-header-icon-bg {
  color: #e4e7ea;
  border-right: 1px solid #23282c;
}

.card-header-action {
  color: #73818f;
}

.card-header-action:hover {
  color: #e4e7ea;
}

.card-accent-primary {
  border-top-color: #20a8d8;
}

.card-accent-secondary {
  border-top-color: #73818f;
}

.card-accent-success {
  border-top-color: #4dbd74;
}

.card-accent-info {
  border-top-color: #63c2de;
}

.card-accent-warning {
  border-top-color: #ffc107;
}

.card-accent-danger {
  border-top-color: #f86c6b;
}

.card-accent-light {
  border-top-color: #f3f4f5;
}

.card-accent-dark {
  border-top-color: #2f353a;
}

.card-full {
  border-bottom: 1px solid #23282c;
}

.chartjs-tooltip {
  color: #fff;
}

.dropdown-item {
  border-bottom: 1px solid #23282c;
}

.dropdown-item i {
  color: #73818f;
}

.dropdown-header {
  background: #343b41;
  border-bottom: 1px solid #23282c;
}

.dropdown-header .btn {
  color: #e4e7ea;
}

.dropdown-header .btn:hover {
  color: #e4e7ea;
}

.app-footer {
  color: #e4e7ea;
  background: #3a4149;
  border-top: 1px solid #23282c;
}

.app-header {
  background-color: #3a4149;
  border-bottom: 1px solid #23282c;
}

.app-header .navbar-brand {
  background-color: transparent;
}

.app-header .navbar-toggler:hover .navbar-toggler-icon {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMzAgMzAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggc3Ryb2tlPScjZTRlN2VhJyBzdHJva2Utd2lkdGg9JzIuMjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLW1pdGVybGltaXQ9JzEwJyBkPSdNNCA3aDIyTTQgMTVoMjJNNCAyM2gyMicvPjwvc3ZnPg==);
}

.app-header .navbar-toggler-icon {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMzAgMzAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggc3Ryb2tlPScjYzhjZWQzJyBzdHJva2Utd2lkdGg9JzIuMjUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLW1pdGVybGltaXQ9JzEwJyBkPSdNNCA3aDIyTTQgMTVoMjJNNCAyM2gyMicvPjwvc3ZnPg==);
}

.navbar-nav .nav-link {
  color: #c8ced3;
}

.navbar-nav .active > .nav-link,
.navbar-nav .active > .nav-link:focus,
.navbar-nav .active > .nav-link:hover,
.navbar-nav .nav-link.active,
.navbar-nav .nav-link.active:focus,
.navbar-nav .nav-link.active:hover,
.navbar-nav .nav-link.open,
.navbar-nav .nav-link.open:focus,
.navbar-nav .nav-link.open:hover,
.navbar-nav .nav-link:focus,
.navbar-nav .nav-link:hover,
.navbar-nav .open > .nav-link,
.navbar-nav .open > .nav-link:focus,
.navbar-nav .open > .nav-link:hover {
  color: #e4e7ea;
}

.navbar-divider {
  background-color: rgba(0, 0, 0, 0.075);
}

.input-group-append,
.input-group-prepend {
  white-space: nowrap;
  vertical-align: middle;
}

.avatar > img,
.img-avatar,
.img-circle {
  max-width: 100%;
  height: auto;
  border-radius: 50em;
}

.list-group-accent .list-group-item {
  margin-bottom: 1px;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  border-radius: 0;
}

.list-group-accent .list-group-item.list-group-item-divider {
  position: relative;
}

.list-group-accent .list-group-item.list-group-item-divider:before {
  content: "";
  background-color: #2f353a;
}

.modal-primary .modal-content {
  border-color: #20a8d8;
}

.modal-primary .modal-header {
  color: #fff;
  background-color: #20a8d8;
}

.modal-secondary .modal-content {
  border-color: #73818f;
}

.modal-secondary .modal-header {
  color: #fff;
  background-color: #73818f;
}

.modal-success .modal-content {
  border-color: #4dbd74;
}

.modal-success .modal-header {
  color: #fff;
  background-color: #4dbd74;
}

.modal-info .modal-content {
  border-color: #63c2de;
}

.modal-info .modal-header {
  color: #fff;
  background-color: #63c2de;
}

.modal-warning .modal-content {
  border-color: #ffc107;
}

.modal-warning .modal-header {
  color: #fff;
  background-color: #ffc107;
}

.modal-danger .modal-content {
  border-color: #f86c6b;
}

.modal-danger .modal-header {
  color: #fff;
  background-color: #f86c6b;
}

.modal-light .modal-content {
  border-color: #f3f4f5;
}

.modal-light .modal-header {
  color: #fff;
  background-color: #f3f4f5;
}

.modal-dark .modal-content {
  border-color: #2f353a;
}

.modal-dark .modal-header {
  color: #fff;
  background-color: #2f353a;
}

.nav-tabs .nav-link {
  color: #73818f;
}

.tab-content {
  background: #3a4149;
  border: 1px solid #23282c;
}

.nav-fill .nav-link {
  background-color: #fff;
  border-color: #23282c;
}

.progress-white {
  background-color: hsla(0, 0%, 100%, 0.2);
}

.progress-white .progress-bar {
  background-color: #fff;
}

.progress-group-text {
  color: #73818f;
}

.sidebar {
  color: #f3f4f5;
  background: #3a4149;
  border-right: 1px solid #23282c;
}

.sidebar .sidebar-close {
  color: #f3f4f5;
}

.sidebar .sidebar-header {
  background: rgba(0, 0, 0, 0.2);
}

.sidebar .sidebar-form .form-control {
  color: #fff;
  background: #23282c;
}

.sidebar .sidebar-form .form-control::-webkit-input-placeholder {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .sidebar-form .form-control::-ms-input-placeholder {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .sidebar-form .form-control::placeholder {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .nav-title {
  color: #e4e7ea;
}

.sidebar .nav-link {
  color: #fff;
}

.sidebar .nav-link .nav-icon {
  color: #73818f;
}

.sidebar .nav-link.active {
  color: #fff;
  background: #343b41;
}

.sidebar .nav-link.active .nav-icon {
  color: #20a8d8;
}

.sidebar .nav-link:hover {
  color: #fff;
  background: #20a8d8;
}

.sidebar .nav-link:hover .nav-icon {
  color: #fff;
}

.sidebar .nav-link:hover.nav-dropdown-toggle:before {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMSAxNCc+PHBhdGggZmlsbD0nI2ZmZicgZD0nTTkuMTQ4IDIuMzUybC00LjE0OCA0LjE0OCA0LjE0OCA0LjE0OHEwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJsLTEuMjk3IDEuMjk3cS0wLjE0OCAwLjE0OC0wLjM1MiAwLjE0OHQtMC4zNTItMC4xNDhsLTUuNzk3LTUuNzk3cS0wLjE0OC0wLjE0OC0wLjE0OC0wLjM1MnQwLjE0OC0wLjM1Mmw1Ljc5Ny01Ljc5N3EwLjE0OC0wLjE0OCAwLjM1Mi0wLjE0OHQwLjM1MiAwLjE0OGwxLjI5NyAxLjI5N3EwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJ6Jy8+PC9zdmc+);
}

.sidebar .nav-link.disabled {
  color: #b3b3b3;
}

.sidebar .nav-link.disabled .nav-icon {
  color: #73818f;
}

.sidebar .nav-link.disabled:hover {
  color: #b3b3b3;
}

.sidebar .nav-link.disabled:hover .nav-icon {
  color: #73818f;
}

.sidebar .nav-link.disabled:hover.nav-dropdown-toggle:before {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMSAxNCc+PHBhdGggZmlsbD0nI2ZmZicgZD0nTTkuMTQ4IDIuMzUybC00LjE0OCA0LjE0OCA0LjE0OCA0LjE0OHEwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJsLTEuMjk3IDEuMjk3cS0wLjE0OCAwLjE0OC0wLjM1MiAwLjE0OHQtMC4zNTItMC4xNDhsLTUuNzk3LTUuNzk3cS0wLjE0OC0wLjE0OC0wLjE0OC0wLjM1MnQwLjE0OC0wLjM1Mmw1Ljc5Ny01Ljc5N3EwLjE0OC0wLjE0OCAwLjM1Mi0wLjE0OHQwLjM1MiAwLjE0OGwxLjI5NyAxLjI5N3EwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJ6Jy8+PC9zdmc+);
}

.sidebar .nav-link.nav-link-primary {
  background: #20a8d8;
}

.sidebar .nav-link.nav-link-primary .nav-icon {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .nav-link.nav-link-primary:hover {
  background: #1d97c2;
}

.sidebar .nav-link.nav-link-primary:hover i {
  color: #fff;
}

.sidebar .nav-link.nav-link-secondary {
  background: #73818f;
}

.sidebar .nav-link.nav-link-secondary .nav-icon {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .nav-link.nav-link-secondary:hover {
  background: #677481;
}

.sidebar .nav-link.nav-link-secondary:hover i {
  color: #fff;
}

.sidebar .nav-link.nav-link-success {
  background: #4dbd74;
}

.sidebar .nav-link.nav-link-success .nav-icon {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .nav-link.nav-link-success:hover {
  background: #41af67;
}

.sidebar .nav-link.nav-link-success:hover i {
  color: #fff;
}

.sidebar .nav-link.nav-link-info {
  background: #63c2de;
}

.sidebar .nav-link.nav-link-info .nav-icon {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .nav-link.nav-link-info:hover {
  background: #4ebada;
}

.sidebar .nav-link.nav-link-info:hover i {
  color: #fff;
}

.sidebar .nav-link.nav-link-warning {
  background: #ffc107;
}

.sidebar .nav-link.nav-link-warning .nav-icon {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .nav-link.nav-link-warning:hover {
  background: #edb100;
}

.sidebar .nav-link.nav-link-warning:hover i {
  color: #fff;
}

.sidebar .nav-link.nav-link-danger {
  background: #f86c6b;
}

.sidebar .nav-link.nav-link-danger .nav-icon {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .nav-link.nav-link-danger:hover {
  background: #f75453;
}

.sidebar .nav-link.nav-link-danger:hover i {
  color: #fff;
}

.sidebar .nav-link.nav-link-light {
  background: #f3f4f5;
}

.sidebar .nav-link.nav-link-light .nav-icon {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .nav-link.nav-link-light:hover {
  background: #e4e7ea;
}

.sidebar .nav-link.nav-link-light:hover i {
  color: #fff;
}

.sidebar .nav-link.nav-link-dark {
  background: #2f353a;
}

.sidebar .nav-link.nav-link-dark .nav-icon {
  color: hsla(0, 0%, 100%, 0.7);
}

.sidebar .nav-link.nav-link-dark:hover {
  background: #23282c;
}

.sidebar .nav-link.nav-link-dark:hover i {
  color: #fff;
}

.sidebar .nav-dropdown-toggle:before {
  content: "";
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMSAxNCc+PHBhdGggZmlsbD0nIzczODE4ZicgZD0nTTkuMTQ4IDIuMzUybC00LjE0OCA0LjE0OCA0LjE0OCA0LjE0OHEwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJsLTEuMjk3IDEuMjk3cS0wLjE0OCAwLjE0OC0wLjM1MiAwLjE0OHQtMC4zNTItMC4xNDhsLTUuNzk3LTUuNzk3cS0wLjE0OC0wLjE0OC0wLjE0OC0wLjM1MnQwLjE0OC0wLjM1Mmw1Ljc5Ny01Ljc5N3EwLjE0OC0wLjE0OCAwLjM1Mi0wLjE0OHQwLjM1MiAwLjE0OGwxLjI5NyAxLjI5N3EwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJ6Jy8+PC9zdmc+);
}

.sidebar .nav-dropdown.open {
  background: rgba(0, 0, 0, 0.2);
}

.sidebar .nav-dropdown.open .nav-link {
  color: #fff;
}

.sidebar .nav-dropdown.open .nav-link.disabled {
  color: #b3b3b3;
}

.sidebar .nav-dropdown.open .nav-link.disabled:hover {
  color: #b3b3b3;
}

.sidebar .nav-dropdown.open .nav-link.disabled:hover .nav-icon {
  color: #73818f;
}

.sidebar .nav-label {
  color: #e4e7ea;
}

.sidebar .nav-label:hover {
  color: #f3f4f5;
}

.sidebar .nav-label .nav-icon {
  color: #73818f;
}

.sidebar .progress {
  background-color: #949494 !important;
}

.sidebar .sidebar-footer {
  background: rgba(0, 0, 0, 0.2);
}

.sidebar .sidebar-minimizer {
  background-color: rgba(0, 0, 0, 0.2);
}

.sidebar .sidebar-minimizer:before {
  content: "";
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMSAxNCc+PHBhdGggZmlsbD0nIzczODE4ZicgZD0nTTkuMTQ4IDIuMzUybC00LjE0OCA0LjE0OCA0LjE0OCA0LjE0OHEwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJsLTEuMjk3IDEuMjk3cS0wLjE0OCAwLjE0OC0wLjM1MiAwLjE0OHQtMC4zNTItMC4xNDhsLTUuNzk3LTUuNzk3cS0wLjE0OC0wLjE0OC0wLjE0OC0wLjM1MnQwLjE0OC0wLjM1Mmw1Ljc5Ny01Ljc5N3EwLjE0OC0wLjE0OCAwLjM1Mi0wLjE0OHQwLjM1MiAwLjE0OGwxLjI5NyAxLjI5N3EwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJ6Jy8+PC9zdmc+);
}

.sidebar .sidebar-minimizer:hover:before {
  background-image: url(data:image/svg+xml;charset=utf8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMSAxNCc+PHBhdGggZmlsbD0nI2ZmZicgZD0nTTkuMTQ4IDIuMzUybC00LjE0OCA0LjE0OCA0LjE0OCA0LjE0OHEwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJsLTEuMjk3IDEuMjk3cS0wLjE0OCAwLjE0OC0wLjM1MiAwLjE0OHQtMC4zNTItMC4xNDhsLTUuNzk3LTUuNzk3cS0wLjE0OC0wLjE0OC0wLjE0OC0wLjM1MnQwLjE0OC0wLjM1Mmw1Ljc5Ny01Ljc5N3EwLjE0OC0wLjE0OCAwLjM1Mi0wLjE0OHQwLjM1MiAwLjE0OGwxLjI5NyAxLjI5N3EwLjE0OCAwLjE0OCAwLjE0OCAwLjM1MnQtMC4xNDggMC4zNTJ6Jy8+PC9zdmc+);
}

.sidebar-minimized .sidebar .sidebar-minimizer {
  background-color: #2f353a;
}

.sidebar-minimized .sidebar .nav-item:hover > .nav-link {
  background: #20a8d8;
}

.sidebar-minimized .sidebar .nav-item:hover > .nav-link .nav-icon {
  color: #fff;
}

.sidebar-minimized .sidebar .nav-item:hover > .nav-link.disabled {
  background: #3a4149;
}

.sidebar-minimized .sidebar .nav-item:hover > .nav-link.disabled .nav-icon {
  color: #73818f;
}

.sidebar-minimized .sidebar .nav-link:hover {
  background: #20a8d8;
}

.sidebar-minimized .sidebar .nav > .nav-dropdown > .nav-dropdown-items {
  background: #3a4149;
}

.sidebar-minimized .sidebar .nav > .nav-dropdown:hover {
  background: #20a8d8;
}

[dir="rtl"] .sidebar-minimized .sidebar .nav {
  list-style-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);
}

[dir="rtl"]
  .sidebar-minimized
  .sidebar
  .nav
  > .nav-dropdown
  > .nav-dropdown-items {
  background: #3a4149;
}

[dir="rtl"] .sidebar-minimized .sidebar .nav > .nav-dropdown:hover {
  background: #20a8d8;
}

.switch-slider {
  background-color: #343b41;
  border: 1px solid #23282c;
}

.switch-slider:before {
  background-color: #fff;
  border: 1px solid #23282c;
}

.switch-label .switch-slider:after {
  color: #c8ced3;
}

.switch-label .switch-input:checked ~ .switch-slider:after {
  color: #fff;
}

.switch-3d .switch-slider {
  background-color: #f3f4f5;
}

.switch-primary .switch-input:checked + .switch-slider {
  background-color: #20a8d8;
  border-color: #1985ac;
}

.switch-primary .switch-input:checked + .switch-slider:before {
  border-color: #1985ac;
}

.switch-outline-primary .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #20a8d8;
}

.switch-outline-primary .switch-input:checked + .switch-slider:before {
  border-color: #20a8d8;
}

.switch-outline-primary .switch-input:checked + .switch-slider:after {
  color: #20a8d8;
}

.switch-outline-primary-alt .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #20a8d8;
}

.switch-outline-primary-alt .switch-input:checked + .switch-slider:before {
  background-color: #20a8d8;
  border-color: #20a8d8;
}

.switch-outline-primary-alt .switch-input:checked + .switch-slider:after {
  color: #20a8d8;
}

.switch-secondary .switch-input:checked + .switch-slider {
  background-color: #73818f;
  border-color: #5c6873;
}

.switch-secondary .switch-input:checked + .switch-slider:before {
  border-color: #5c6873;
}

.switch-outline-secondary .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #73818f;
}

.switch-outline-secondary .switch-input:checked + .switch-slider:before {
  border-color: #73818f;
}

.switch-outline-secondary .switch-input:checked + .switch-slider:after {
  color: #73818f;
}

.switch-outline-secondary-alt .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #73818f;
}

.switch-outline-secondary-alt .switch-input:checked + .switch-slider:before {
  background-color: #73818f;
  border-color: #73818f;
}

.switch-outline-secondary-alt .switch-input:checked + .switch-slider:after {
  color: #73818f;
}

.switch-success .switch-input:checked + .switch-slider {
  background-color: #4dbd74;
  border-color: #3a9d5d;
}

.switch-success .switch-input:checked + .switch-slider:before {
  border-color: #3a9d5d;
}

.switch-outline-success .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #4dbd74;
}

.switch-outline-success .switch-input:checked + .switch-slider:before {
  border-color: #4dbd74;
}

.switch-outline-success .switch-input:checked + .switch-slider:after {
  color: #4dbd74;
}

.switch-outline-success-alt .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #4dbd74;
}

.switch-outline-success-alt .switch-input:checked + .switch-slider:before {
  background-color: #4dbd74;
  border-color: #4dbd74;
}

.switch-outline-success-alt .switch-input:checked + .switch-slider:after {
  color: #4dbd74;
}

.switch-info .switch-input:checked + .switch-slider {
  background-color: #63c2de;
  border-color: #39b2d5;
}

.switch-info .switch-input:checked + .switch-slider:before {
  border-color: #39b2d5;
}

.switch-outline-info .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #63c2de;
}

.switch-outline-info .switch-input:checked + .switch-slider:before {
  border-color: #63c2de;
}

.switch-outline-info .switch-input:checked + .switch-slider:after {
  color: #63c2de;
}

.switch-outline-info-alt .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #63c2de;
}

.switch-outline-info-alt .switch-input:checked + .switch-slider:before {
  background-color: #63c2de;
  border-color: #63c2de;
}

.switch-outline-info-alt .switch-input:checked + .switch-slider:after {
  color: #63c2de;
}

.switch-warning .switch-input:checked + .switch-slider {
  background-color: #ffc107;
  border-color: #d39e00;
}

.switch-warning .switch-input:checked + .switch-slider:before {
  border-color: #d39e00;
}

.switch-outline-warning .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #ffc107;
}

.switch-outline-warning .switch-input:checked + .switch-slider:before {
  border-color: #ffc107;
}

.switch-outline-warning .switch-input:checked + .switch-slider:after {
  color: #ffc107;
}

.switch-outline-warning-alt .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #ffc107;
}

.switch-outline-warning-alt .switch-input:checked + .switch-slider:before {
  background-color: #ffc107;
  border-color: #ffc107;
}

.switch-outline-warning-alt .switch-input:checked + .switch-slider:after {
  color: #ffc107;
}

.switch-danger .switch-input:checked + .switch-slider {
  background-color: #f86c6b;
  border-color: #f63c3a;
}

.switch-danger .switch-input:checked + .switch-slider:before {
  border-color: #f63c3a;
}

.switch-outline-danger .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #f86c6b;
}

.switch-outline-danger .switch-input:checked + .switch-slider:before {
  border-color: #f86c6b;
}

.switch-outline-danger .switch-input:checked + .switch-slider:after {
  color: #f86c6b;
}

.switch-outline-danger-alt .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #f86c6b;
}

.switch-outline-danger-alt .switch-input:checked + .switch-slider:before {
  background-color: #f86c6b;
  border-color: #f86c6b;
}

.switch-outline-danger-alt .switch-input:checked + .switch-slider:after {
  color: #f86c6b;
}

.switch-light .switch-input:checked + .switch-slider {
  background-color: #f3f4f5;
  border-color: #d6dade;
}

.switch-light .switch-input:checked + .switch-slider:before {
  border-color: #d6dade;
}

.switch-outline-light .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #f3f4f5;
}

.switch-outline-light .switch-input:checked + .switch-slider:before {
  border-color: #f3f4f5;
}

.switch-outline-light .switch-input:checked + .switch-slider:after {
  color: #f3f4f5;
}

.switch-outline-light-alt .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #f3f4f5;
}

.switch-outline-light-alt .switch-input:checked + .switch-slider:before {
  background-color: #f3f4f5;
  border-color: #f3f4f5;
}

.switch-outline-light-alt .switch-input:checked + .switch-slider:after {
  color: #f3f4f5;
}

.switch-dark .switch-input:checked + .switch-slider {
  background-color: #2f353a;
  border-color: #181b1e;
}

.switch-dark .switch-input:checked + .switch-slider:before {
  border-color: #181b1e;
}

.switch-outline-dark .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #2f353a;
}

.switch-outline-dark .switch-input:checked + .switch-slider:before {
  border-color: #2f353a;
}

.switch-outline-dark .switch-input:checked + .switch-slider:after {
  color: #2f353a;
}

.switch-outline-dark-alt .switch-input:checked + .switch-slider {
  background-color: #343b41;
  border-color: #2f353a;
}

.switch-outline-dark-alt .switch-input:checked + .switch-slider:before {
  background-color: #2f353a;
  border-color: #2f353a;
}

.switch-outline-dark-alt .switch-input:checked + .switch-slider:after {
  color: #2f353a;
}

.table-outline {
  border: 1px solid #23282c;
}

hr.transparent {
  border-top: 1px solid transparent;
}

.bg-danger,
.bg-dark,
.bg-info,
.bg-primary,
.bg-success,
.bg-warning {
  color: #fff;
}

.bg-facebook {
  background-color: #3b5998 !important;
}

a.bg-facebook:focus,
a.bg-facebook:hover,
button.bg-facebook:focus,
button.bg-facebook:hover {
  background-color: #2d4373 !important;
}

.bg-twitter {
  background-color: #00aced !important;
}

a.bg-twitter:focus,
a.bg-twitter:hover,
button.bg-twitter:focus,
button.bg-twitter:hover {
  background-color: #0087ba !important;
}

.bg-linkedin {
  background-color: #4875b4 !important;
}

a.bg-linkedin:focus,
a.bg-linkedin:hover,
button.bg-linkedin:focus,
button.bg-linkedin:hover {
  background-color: #395d90 !important;
}

.bg-google-plus {
  background-color: #d34836 !important;
}

a.bg-google-plus:focus,
a.bg-google-plus:hover,
button.bg-google-plus:focus,
button.bg-google-plus:hover {
  background-color: #b03626 !important;
}

.bg-flickr {
  background-color: #ff0084 !important;
}

a.bg-flickr:focus,
a.bg-flickr:hover,
button.bg-flickr:focus,
button.bg-flickr:hover {
  background-color: #cc006a !important;
}

.bg-tumblr {
  background-color: #32506d !important;
}

a.bg-tumblr:focus,
a.bg-tumblr:hover,
button.bg-tumblr:focus,
button.bg-tumblr:hover {
  background-color: #22364a !important;
}

.bg-xing {
  background-color: #026466 !important;
}

a.bg-xing:focus,
a.bg-xing:hover,
button.bg-xing:focus,
button.bg-xing:hover {
  background-color: #013334 !important;
}

.bg-github {
  background-color: #4183c4 !important;
}

a.bg-github:focus,
a.bg-github:hover,
button.bg-github:focus,
button.bg-github:hover {
  background-color: #3269a0 !important;
}

.bg-html5 {
  background-color: #e34f26 !important;
}

a.bg-html5:focus,
a.bg-html5:hover,
button.bg-html5:focus,
button.bg-html5:hover {
  background-color: #be3c18 !important;
}

.bg-openid {
  background-color: #f78c40 !important;
}

a.bg-openid:focus,
a.bg-openid:hover,
button.bg-openid:focus,
button.bg-openid:hover {
  background-color: #f56f0f !important;
}

.bg-stack-overflow {
  background-color: #fe7a15 !important;
}

a.bg-stack-overflow:focus,
a.bg-stack-overflow:hover,
button.bg-stack-overflow:focus,
button.bg-stack-overflow:hover {
  background-color: #df6101 !important;
}

.bg-youtube {
  background-color: #b00 !important;
}

a.bg-youtube:focus,
a.bg-youtube:hover,
button.bg-youtube:focus,
button.bg-youtube:hover {
  background-color: #800 !important;
}

.bg-css3 {
  background-color: #0170ba !important;
}

a.bg-css3:focus,
a.bg-css3:hover,
button.bg-css3:focus,
button.bg-css3:hover {
  background-color: #015187 !important;
}

.bg-dribbble {
  background-color: #ea4c89 !important;
}

a.bg-dribbble:focus,
a.bg-dribbble:hover,
button.bg-dribbble:focus,
button.bg-dribbble:hover {
  background-color: #e51e6b !important;
}

.bg-instagram {
  background-color: #517fa4 !important;
}

a.bg-instagram:focus,
a.bg-instagram:hover,
button.bg-instagram:focus,
button.bg-instagram:hover {
  background-color: #406582 !important;
}

.bg-pinterest {
  background-color: #cb2027 !important;
}

a.bg-pinterest:focus,
a.bg-pinterest:hover,
button.bg-pinterest:focus,
button.bg-pinterest:hover {
  background-color: #9f191f !important;
}

.bg-vk {
  background-color: #45668e !important;
}

a.bg-vk:focus,
a.bg-vk:hover,
button.bg-vk:focus,
button.bg-vk:hover {
  background-color: #344d6c !important;
}

.bg-yahoo {
  background-color: #400191 !important;
}

a.bg-yahoo:focus,
a.bg-yahoo:hover,
button.bg-yahoo:focus,
button.bg-yahoo:hover {
  background-color: #2a015e !important;
}

.bg-behance {
  background-color: #1769ff !important;
}

a.bg-behance:focus,
a.bg-behance:hover,
button.bg-behance:focus,
button.bg-behance:hover {
  background-color: #0050e3 !important;
}

.bg-dropbox {
  background-color: #007ee5 !important;
}

a.bg-dropbox:focus,
a.bg-dropbox:hover,
button.bg-dropbox:focus,
button.bg-dropbox:hover {
  background-color: #0062b2 !important;
}

.bg-reddit {
  background-color: #ff4500 !important;
}

a.bg-reddit:focus,
a.bg-reddit:hover,
button.bg-reddit:focus,
button.bg-reddit:hover {
  background-color: #cc3700 !important;
}

.bg-spotify {
  background-color: #7ab800 !important;
}

a.bg-spotify:focus,
a.bg-spotify:hover,
button.bg-spotify:focus,
button.bg-spotify:hover {
  background-color: #588500 !important;
}

.bg-vine {
  background-color: #00bf8f !important;
}

a.bg-vine:focus,
a.bg-vine:hover,
button.bg-vine:focus,
button.bg-vine:hover {
  background-color: #008c69 !important;
}

.bg-foursquare {
  background-color: #1073af !important;
}

a.bg-foursquare:focus,
a.bg-foursquare:hover,
button.bg-foursquare:focus,
button.bg-foursquare:hover {
  background-color: #0c5480 !important;
}

.bg-vimeo {
  background-color: #aad450 !important;
}

a.bg-vimeo:focus,
a.bg-vimeo:hover,
button.bg-vimeo:focus,
button.bg-vimeo:hover {
  background-color: #93c130 !important;
}

.bg-blue {
  background-color: #20a8d8 !important;
}

a.bg-blue:focus,
a.bg-blue:hover,
button.bg-blue:focus,
button.bg-blue:hover {
  background-color: #1985ac !important;
}

.bg-indigo {
  background-color: #6610f2 !important;
}

a.bg-indigo:focus,
a.bg-indigo:hover,
button.bg-indigo:focus,
button.bg-indigo:hover {
  background-color: #510bc4 !important;
}

.bg-purple {
  background-color: #6f42c1 !important;
}

a.bg-purple:focus,
a.bg-purple:hover,
button.bg-purple:focus,
button.bg-purple:hover {
  background-color: #59339d !important;
}

.bg-pink {
  background-color: #e83e8c !important;
}

a.bg-pink:focus,
a.bg-pink:hover,
button.bg-pink:focus,
button.bg-pink:hover {
  background-color: #d91a72 !important;
}

.bg-red {
  background-color: #f86c6b !important;
}

a.bg-red:focus,
a.bg-red:hover,
button.bg-red:focus,
button.bg-red:hover {
  background-color: #f63c3a !important;
}

.bg-orange {
  background-color: #f8cb00 !important;
}

a.bg-orange:focus,
a.bg-orange:hover,
button.bg-orange:focus,
button.bg-orange:hover {
  background-color: #c5a100 !important;
}

.bg-yellow {
  background-color: #ffc107 !important;
}

a.bg-yellow:focus,
a.bg-yellow:hover,
button.bg-yellow:focus,
button.bg-yellow:hover {
  background-color: #d39e00 !important;
}

.bg-green {
  background-color: #4dbd74 !important;
}

a.bg-green:focus,
a.bg-green:hover,
button.bg-green:focus,
button.bg-green:hover {
  background-color: #3a9d5d !important;
}

.bg-teal {
  background-color: #20c997 !important;
}

a.bg-teal:focus,
a.bg-teal:hover,
button.bg-teal:focus,
button.bg-teal:hover {
  background-color: #199d76 !important;
}

.bg-cyan {
  background-color: #17a2b8 !important;
}

a.bg-cyan:focus,
a.bg-cyan:hover,
button.bg-cyan:focus,
button.bg-cyan:hover {
  background-color: #117a8b !important;
}

.bg-white {
  background-color: #fff !important;
}

a.bg-white:focus,
a.bg-white:hover,
button.bg-white:focus,
button.bg-white:hover {
  background-color: #e6e6e6 !important;
}

.bg-gray {
  background-color: #73818f !important;
}

a.bg-gray:focus,
a.bg-gray:hover,
button.bg-gray:focus,
button.bg-gray:hover {
  background-color: #5c6873 !important;
}

.bg-gray-dark {
  background-color: #2f353a !important;
}

a.bg-gray-dark:focus,
a.bg-gray-dark:hover,
button.bg-gray-dark:focus,
button.bg-gray-dark:hover {
  background-color: #181b1e !important;
}

.bg-light-blue {
  background-color: #63c2de !important;
}

a.bg-light-blue:focus,
a.bg-light-blue:hover,
button.bg-light-blue:focus,
button.bg-light-blue:hover {
  background-color: #39b2d5 !important;
}

.bg-gray-100 {
  background-color: #f3f4f5 !important;
}

a.bg-gray-100:focus,
a.bg-gray-100:hover,
button.bg-gray-100:focus,
button.bg-gray-100:hover {
  background-color: #d6dade !important;
}

.bg-gray-200 {
  background-color: #e4e7ea !important;
}

.bg-gray-300,
a.bg-gray-200:focus,
a.bg-gray-200:hover,
button.bg-gray-200:focus,
button.bg-gray-200:hover {
  background-color: #c8ced3 !important;
}

.bg-gray-400,
a.bg-gray-300:focus,
a.bg-gray-300:hover,
button.bg-gray-300:focus,
button.bg-gray-300:hover {
  background-color: #acb4bc !important;
}

.bg-gray-500,
a.bg-gray-400:focus,
a.bg-gray-400:hover,
button.bg-gray-400:focus,
button.bg-gray-400:hover {
  background-color: #8f9ba6 !important;
}

.bg-gray-600,
a.bg-gray-500:focus,
a.bg-gray-500:hover,
button.bg-gray-500:focus,
button.bg-gray-500:hover {
  background-color: #73818f !important;
}

a.bg-gray-600:focus,
a.bg-gray-600:hover,
button.bg-gray-600:focus,
button.bg-gray-600:hover {
  background-color: #5c6873 !important;
}

.bg-gray-700 {
  background-color: #3a4149 !important;
}

a.bg-gray-700:focus,
a.bg-gray-700:hover,
button.bg-gray-700:focus,
button.bg-gray-700:hover {
  background-color: #23282c !important;
}

.bg-gray-800 {
  background-color: #2f353a !important;
}

a.bg-gray-800:focus,
a.bg-gray-800:hover,
button.bg-gray-800:focus,
button.bg-gray-800:hover {
  background-color: #181b1e !important;
}

.bg-gray-900 {
  background-color: #23282c !important;
}

a.bg-gray-900:focus,
a.bg-gray-900:hover,
button.bg-gray-900:focus,
button.bg-gray-900:hover {
  background-color: #0d0e10 !important;
}

.b-a-1 {
  border: 1px solid #23282c;
}

.b-t-1 {
  border-top: 1px solid #23282c;
}

.b-r-1 {
  border-right: 1px solid #23282c;
}

.b-b-1 {
  border-bottom: 1px solid #23282c;
}

.b-l-1 {
  border-left: 1px solid #23282c;
}

.b-a-2 {
  border: 2px solid #23282c;
}

.b-t-2 {
  border-top: 2px solid #23282c;
}

.b-r-2 {
  border-right: 2px solid #23282c;
}

.b-b-2 {
  border-bottom: 2px solid #23282c;
}

.b-l-2 {
  border-left: 2px solid #23282c;
}

.email-app {
  background: #fff;
  border: 1px solid #23282c;
}

.email-app nav {
  border-right: 1px solid #23282c;
}

.email-app nav .nav-link {
  color: #e4e7ea;
  border-bottom: 1px solid #23282c;
}

.email-app .inbox .toolbar {
  border-bottom: 1px solid #23282c;
}

.email-app .inbox .message {
  border-bottom: 1px solid #23282c;
}

.email-app .inbox .message:hover {
  background: #f3f4f5;
}

.email-app .inbox .message .actions .action {
  color: #c8ced3;
}

.email-app .inbox .message a {
  color: #000;
}

.email-app .message .toolbar {
  border-bottom: 1px solid #23282c;
}

.email-app .message .details .header {
  border-top: 1px solid #23282c;
  border-bottom: 1px solid #23282c;
}

.email-app .message .details .header .from {
  color: #73818f;
}

.email-app .message .details .attachments {
  border-top: 3px solid #f3f4f5;
  border-bottom: 3px solid #f3f4f5;
}
</style>
