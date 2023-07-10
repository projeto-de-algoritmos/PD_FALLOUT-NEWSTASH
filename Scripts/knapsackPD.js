class Item {
  constructor(nome, peso, valor) {
    this.nome = nome;
    this.peso = peso;
    this.valor = valor;
  }
}

function knapsackPD(capacidade, itens) {
  const n = itens.length;
  const dp = new Array(n + 1)
    .fill(null)
    .map(() => new Array(capacidade + 1).fill(0));
  const selecionados = new Array(n + 1)
    .fill(null)
    .map(() => new Array(capacidade + 1).fill(false));

  for (let i = 1; i <= n; i++) {
    const item = itens[i - 1];
    for (let j = 1; j <= capacidade; j++) {
      if (item.peso > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        const inclui = item.valor + dp[i - 1][j - item.peso];
        const exclui = dp[i - 1][j];
        dp[i][j] = Math.max(inclui, exclui);
        selecionados[i][j] = inclui > exclui;
      }
    }
  }

  let pesoAtual = capacidade;
  const itensSelecionados = [];

  for (let i = n; i >= 1; i--) {
    if (selecionados[i][pesoAtual]) {
      const item = itens[i - 1];
      itensSelecionados.push(item);
      pesoAtual -= item.peso;
    }
  }

  return {
    valor_total: dp[n][capacidade],
    itensSelecionados: itensSelecionados.reverse(),
    capacidade: pesoAtual,
  };
}

const itens = [
  new Item("Deliverer", 10, 770),
  new Item("The Last Minute", 20, 6500),
  new Item("Nuka-nuke Launcher", 40, 650),
  new Item("Combat Rifle", 20, 1000),
  new Item("Combat Shotgun", 30, 1200),
  new Item("Fat Man", 40, 5000),
  new Item("Furious Power Fist", 20, 1500),
  new Item("Gauss Rifle", 30, 2500),
  new Item("Gamma Gun", 10, 800),
  new Item("Junk Jet", 30, 3000),
  new Item("Kremvh's Tooth", 10, 600),
  new Item("Molotov Cocktail", 10, 50),
  new Item("Overseer's Guardian", 20, 2000),
  new Item("Plasma Grenade", 10, 100),
  new Item("Reba II", 10, 200),
  new Item("Shishkebab", 20, 700),
  new Item("Sledgehammer", 30, 300),
  new Item("Tire Iron", 20, 1000),
  new Item("Laser Pistol", 10, 600),
  new Item("Tesla Rifle", 30, 1800),
  new Item("Hellfire Power Armor", 60, 10000),
  new Item("Leather Armor", 20, 400),
  new Item("Minuteman Outfit", 20, 500),
  new Item("Raider Power Armor", 50, 3000),
  new Item("Assault Gas Mask", 10, 500),
  new Item("Carla's Outfit", 20, 200),
  new Item("Combat Armor", 30, 1200),
  new Item("Covenant Security Armor", 30, 600),
  new Item("Hazmat Suit", 30, 800),
  new Item("Military Fatigues", 20, 400),
  new Item("T-60 Power Armor", 60, 5000),
  new Item("X-01 Power Armor", 60, 8000),
  new Item("Stimpak", 10, 50),
  new Item("Radaway", 10, 60),
  new Item("Jet", 10, 40),
  new Item("Med-X", 10, 30),
  new Item("Yao Guai Meat", 10, 30),
  new Item("Bottlecap Mine", 10, 100),
  new Item("Fusion Core", 10, 500),
  new Item("XCell", 10, 100),
  new Item("Yao Guai Roast", 10, 80),
];

const capacidadeMochila = 300;

const resultado = knapsackPD(capacidadeMochila, itens);

console.log("Valor Total: ", resultado.valorTotal);
console.log("Itens Selecionados: ", resultado.itensSelecionados);
console.log("Capacidade Restante: ", resultado.capacidadeRestante);
