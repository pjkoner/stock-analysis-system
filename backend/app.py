from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return {'message': '股票分析系统后端API', 'status': 'running'}

@app.route('/api/stock/daily')
def get_daily_analysis():
    """获取每日股票分析数据"""
    return jsonify({
        'status': 'success',
        'data': {
            'stock_data': [
                {
                    'code': '600519',
                    'name': '贵州茅台',
                    'current_price': 1500.50,
                    'change': '+2.5%',
                    'technical': {
                        'ma5': 1480.00,
                        'ma10': 1450.00,
                        'ma20': 1400.00,
                        'macd': '金叉',
                        'rsi': 65,
                        'signal': '买入'
                    }
                },
                {
                    'code': '601318',
                    'name': '中国平安',
                    'current_price': 70.30,
                    'change': '+1.2%',
                    'technical': {
                        'ma5': 68.00,
                        'ma10': 67.50,
                        'ma20': 66.00,
                        'macd': '金叉',
                        'rsi': 60,
                        'signal': '买入'
                    }
                }
            ],
            'date': '2025-03-21',
            'summary': '今日市场整体上涨'
        }
    })

@app.route('/api/stock/weekly')
def get_weekly_analysis():
    """获取每周股票分析数据"""
    return jsonify({
        'status': 'success',
        'data': {
            'week': '2025-03-14至2025-03-21',
            'summary': '本周市场整体上涨，科技板块表现强劲',
            'trend': '上涨',
            'sectors': [
                {'name': '金融', 'performance': '+3.2%'},
                {'name': '科技', 'performance': '+5.1%'},
                {'name': '医药', 'performance': '+2.3%'}
            ]
        }
    })

@app.route('/api/fundflow/sector')
def get_sector_fundflow():
    """获取板块资金流向数据"""
    return jsonify({
        'status': 'success',
        'data': {
            'date': '2025-03-21',
            'sectors': [
                {
                    'name': '金融',
                    'inflow': 50000000,
                    'outflow': 30000000,
                    'net': '+20000000',
                    'change': '+5.2%'
                },
                {
                    'name': '科技',
                    'inflow': 30000000,
                    'outflow': 15000000,
                    'net': '+15000000',
                    'change': '+8.1%'
                },
                {
                    'name': '医药',
                    'inflow': 20000000,
                    'outflow': 18000000,
                    'net': '+2000000',
                    'change': '+1.5%'
                }
            ]
        }
    })

@app.route('/api/ai/predictions')
def get_ai_predictions():
    """获取AI预测和建议"""
    return jsonify({
        'status': 'success',
        'data': {
            'predictions': [
                {
                    'stock': '600519',
                    'prediction': '上涨',
                    'confidence': 85,
                    'suggestion': '买入',
                    'reason': '技术面显示多头趋势'
                },
                {
                    'stock': '601318',
                    'prediction': '上涨',
                    'confidence': 70,
                    'suggestion': '买入',
                    'reason': '基本面良好'
                }
            ],
            'date': '2025-03-21'
        }
    })

@app.route('/api/stock/sector-link')
def get_sector_linkage():
    """获取板块联动分析"""
    return jsonify({
        'status': 'success',
        'data': {
            'date': '2025-03-21',
            'linkage': [
                {
                    'sector_a': '金融',
                    'sector_b': '房地产',
                    'correlation': 0.85
                },
                {
                    'sector_a': '科技',
                    'sector_b': '通信',
                    'correlation': 0.75
                }
            ]
        }
    })

@app.route('/api/strategy/recommend')
def get_strategy_recommendation():
    """获取选股策略建议"""
    return jsonify({
        'status': 'success',
        'data': {
            'strategies': [
                {
                    'name': '趋势交易策略',
                    'description': '基于MA指标的趋势跟踪策略',
                    'score': 80,
                    'recommended_stocks': ['600519', '601318']
                },
                {
                    'name': '价值投资策略',
                    'description': '基于基本面分析的价值投资策略',
                    'score': 85,
                    'recommended_stocks': ['000001', '601988']
                }
            ]
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)