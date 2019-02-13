import _Object$keys from "@babel/runtime-corejs2/core-js/object/keys";
import { Aol } from "./adapters/aol";
import { Appnexus } from "./adapters/appnexus";
import { AppnexusAst } from "./adapters/appnexus-ast";
import { AudienceNetwork } from "./adapters/audience-network";
import { Beachfront } from "./adapters/beachfront";
import { IndexExchange } from "./adapters/index-exchange";
import { Kargo } from "./adapters/kargo";
import { Lkqd } from "./adapters/lkqd";
import { Onemobile } from "./adapters/onemobile";
import { Openx } from "./adapters/openx";
import { Pubmatic } from "./adapters/pubmatic";
import { Rubicon } from "./adapters/rubicon";
import { RubiconDisplay } from "./adapters/rubicon-display";
import { Wikia } from "./adapters/wikia";
import { WikiaVideo } from "./adapters/wikia-video";
var adapters = [];
var customAdapters = [];
var availableAdapters = {
  aol: Aol,
  appnexus: Appnexus,
  appnexusAst: AppnexusAst,
  audienceNetwork: AudienceNetwork,
  beachfront: Beachfront,
  indexExchange: IndexExchange,
  kargo: Kargo,
  lkqd: Lkqd,
  onemobile: Onemobile,
  openx: Openx,
  pubmatic: Pubmatic,
  rubicon: Rubicon,
  rubiconDisplay: RubiconDisplay
};

function registerAliases() {
  adapters.filter(function (adapter) {
    return adapter.aliases;
  }).forEach(function (adapter) {
    window.pbjs.que.push(function () {
      var aliasMap = adapter.aliases;

      _Object$keys(aliasMap).forEach(function (bidderName) {
        aliasMap[bidderName].forEach(function (alias) {
          window.pbjs.aliasBidder(bidderName, alias);
        });
      });
    });
  });
}

function setupAdapters(bidders) {
  _Object$keys(availableAdapters).forEach(function (key) {
    if (bidders[key]) {
      var adapter = new availableAdapters[key](bidders[key]);
      adapters.push(adapter);
    }
  });

  setupCustomAdapters(bidders);
}

function setupCustomAdapters(bidders) {
  if (bidders.wikia) {
    customAdapters.push(new Wikia(bidders.wikia));
  }

  if (bidders.wikiaVideo) {
    customAdapters.push(new WikiaVideo(bidders.wikiaVideo));
  }

  customAdapters.forEach(function (adapter) {
    adapters.push(adapter);
    window.pbjs.que.push(function () {
      window.pbjs.registerBidAdapter(adapter.create, adapter.bidderName);
    });
  });
}

export function getPriorities() {
  var priorities = {};
  adapters.forEach(function (adapter) {
    priorities[adapter.bidderName] = adapter.priority || 1;
  });
  return priorities;
}
export function getAdapters(config) {
  if (adapters.length === 0 && config) {
    setupAdapters(config);
    registerAliases();
  }

  return adapters;
}