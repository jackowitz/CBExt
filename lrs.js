var p = new BigInteger(
	'89884656743115795664792711940796' +
	'17685111997008629509452591693927' +
	'90144168845104102271559127054901' +
	'41517040349493104350713250894752' +
	'20959879237703670532992177715065' +
	'98478424121018131591345279606897' +
	'13473746097408990841229149478637' +
	'13278837369681445629745860053176' +
	'30967869589228910283265301105546' +
	'24621072800084070961'
);
var q = new BigInteger(
	'94150659625021698420309014652033' +
	'3547538244481697'
);
var g = new BigInteger(
	'34602665038470649139675399213351' +
	'82139477834214392794040738455572' +
	'02807137340402638246225081443895' +
	'05207857155089278564186198863137' +
	'96370138028745751999252053742993' +
	'75075017163935319671837916152857' +
	'10169926131958833245212562988126' +
	'41540150335936324458348644883586' +
	'77900659507884954910770217699750' +
	'19105890787102335681'
);

function _h1(message) {
	var x = hex_sha1(message);
	return new BigInteger(x, 16).mod(q);
}

function _random(rng) {
	var length = q.bitLength();
	return new BigInteger(length, 1, rng);
}

function sign(m, L, x, pi) {
	var rng = new SecureRandom();

	var h = g.clone();
	var tag = h.modPow(x, p);

	var n = L.length;
	var keystring = '';
	for (var i = 0; i < n; i++) {
		keystring += L[i].toString();
	}
	keystring += tag.toString();
	keystring += m;

	var u = _random(rng);

	var c = new Array();
	c.length = n;

	c[(pi + 1) % n] = _h1(
		keystring +
		g.modPow(u, p).toString() +
		h.modPow(u, p).toString()
	);

	var s = new Array();
	s.length = n;

	for (var i = (pi + 1) % n; i != pi; i = (i + 1) % n) {
		s[i] = _random(rng);

		c[(i + 1) % n] = _h1(
			keystring +
			g.modPow(s[i], p).multiply(
				L[i].modPow(c[i], p)).mod(p).toString() +
			h.modPow(s[i], p).multiply(
				tag.modPow(c[i], p)).mod(p).toString()
		);
	}

	s[pi] = u.subtract(x.multiply(c[pi])).mod(q);

	sig = [ c[0], s, tag ];
	return sig;
}

function verify(sig, m, L) {
	var n = L.length;

	var c = new Array();
	c.length = n + 1;
	c[0] = sig[0];

	var s = sig[1];
	var tag = sig[2];
	var h = g.clone();

	var keystring = '';
	for (var i = 0; i < n; i++) {
		keystring += L[i].toString();
	}
	keystring += tag.toString();
	keystring += m;

	for (var i = 0; i < n; i++) {
		c[i + 1] = _h1(
			keystring +
			g.modPow(s[i], p).multiply(
				L[i].modPow(c[i], p)).mod(p).toString() +
			h.modPow(s[i], p).multiply(
				tag.modPow(c[i], p)).mod(p).toString()
		);
	}
	return c[n].equals(c[0]);
}
