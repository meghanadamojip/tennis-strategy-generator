class StrategyGenerator {
    constructor() {
        this.matchHistory = [];
    }

    generateStrategy(opponent) {
        const strategies = {
            serve: this.analyzeServeStrategy(opponent),
            groundstrokes: this.analyzeGroundstrokeStrategy(opponent),
            positioning: this.analyzePositioning(opponent),
            patterns: this.generatePatterns(opponent)
        };

        return this.compileStrategy(strategies, opponent);
    }

    analyzeServeStrategy(opponent) {
        const strategies = [];
        
        if (opponent.serveRating > 7) {
            strategies.push("Take aggressive return position");
            strategies.push("Focus on consistent returns rather than winners");
        } else {
            strategies.push("Take advantage of weaker serve with aggressive returns");
        }

        if (opponent.playStyle === "serve-volley") {
            strategies.push("Prepare for quick transitions and passing shots");
        }

        return strategies;
    }

    analyzeGroundstrokeStrategy(opponent) {
        const strategies = [];
        
        if (opponent.backhandRating < opponent.forehandRating) {
            strategies.push("Target backhand side consistently");
            strategies.push("Use inside-out forehands to exploit backhand");
        }

        if (opponent.speedRating < 6) {
            strategies.push("Use drop shots to test movement");
            strategies.push("Create court movement with angles");
        }

        return strategies;
    }

    analyzePositioning(opponent) {
        switch(opponent.playStyle) {
            case "baseline":
                return ["Take aggressive court position", "Look for opportunities to approach"];
            case "serve-volley":
                return ["Stay back slightly to handle volleys", "Prepare for passing shots"];
            case "aggressive":
                return ["Maintain good defensive position", "Be ready for quick transitions"];
            case "defensive":
                return ["Take time away with aggressive positioning", "Control baseline"];
        }
    }

    generatePatterns(opponent) {
        const patterns = [];
        
        if (opponent.playStyle === "defensive") {
            patterns.push("Wide serve + inside-out forehand");
            patterns.push("Heavy crosscourt + down the line winner");
        }
        
        if (opponent.speedRating > 8) {
            patterns.push("Use changes of direction to create openings");
            patterns.push("Employ shorter points with decisive shots");
        } else {
            patterns.push("Extended rallies to test endurance");
            patterns.push("Use court geometry to create space");
        }
        
        return patterns;
    }

    compileStrategy(strategies, opponent) {
        return {
            summary: `Strategy for playing against ${opponent.playStyle} player`,
            serve_tactics: strategies.serve,
            groundstroke_plan: strategies.groundstrokes,
            positioning: strategies.positioning,
            patterns: strategies.patterns,
            weaknesses: this.identifyWeaknesses(opponent),
            strengths: this.identifyStrengths(opponent)
        };
    }

    identifyWeaknesses(opponent) {
        const weaknesses = [];
        if (opponent.serveRating < 6) weaknesses.push("Serve");
        if (opponent.backhandRating < 6) weaknesses.push("Backhand");
        if (opponent.forehandRating < 6) weaknesses.push("Forehand");
        if (opponent.speedRating < 6) weaknesses.push("Movement");
        return weaknesses;
    }

    identifyStrengths(opponent) {
        const strengths = [];
        if (opponent.serveRating > 7) strengths.push("Serve");
        if (opponent.backhandRating > 7) strengths.push("Backhand");
        if (opponent.forehandRating > 7) strengths.push("Forehand");
        if (opponent.speedRating > 7) strengths.push("Movement");
        return strengths;
    }
}

const strategyGenerator = new StrategyGenerator();

function generateStrategy() {
    const opponent = {
        playStyle: document.getElementById('playStyle').value,
        serveRating: parseInt(document.getElementById('serveRating').value),
        backhandRating: parseInt(document.getElementById('backhandRating').value),
        forehandRating: parseInt(document.getElementById('forehandRating').value),
        speedRating: parseInt(document.getElementById('speedRating').value)
    };

    const strategy = strategyGenerator.generateStrategy(opponent);
    
    document.getElementById('strategy-output').innerHTML = `
        <h2>${strategy.summary}</h2>
        <h3>Serve Return Tactics:</h3>
        <ul>${strategy.serve_tactics.map(tactic => `<li>${tactic}</li>`).join('')}</ul>
        
        <h3>Groundstroke Strategy:</h3>
        <ul>${strategy.groundstroke_plan.map(plan => `<li>${plan}</li>`).join('')}</ul>
        
        <h3>Court Positioning:</h3>
        <ul>${strategy.positioning.map(pos => `<li>${pos}</li>`).join('')}</ul>
        
        <h3>Tactical Patterns:</h3>
        <ul>${strategy.patterns.map(pattern => `<li>${pattern}</li>`).join('')}</ul>
        
        <h3>Target Weaknesses:</h3>
        <ul>${strategy.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}</ul>
        
        <h3>Watch Out For:</h3>
        <ul>${strategy.strengths.map(strength => `<li>${strength}</li>`).join('')}</ul>
    `;
}
