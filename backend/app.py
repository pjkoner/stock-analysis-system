from flask import Flask, jsonify, request
from flask_cors import CORS
from services.data_collector import DataCollector
from services.analyzer import StockAnalyzer
import datetime

app = Flask(__name__)
CORS(app)

# 初始化服务
data_collector = DataCollector()
analyzer = StockAnalyzer()

@app.route('/')
def home():
    return {'message': '股票分析系统后端API', 'status': 'running', 'version': '1.0'}

@app.route('/api/stock/daily')
def get_daily_analysis():
    """获取每日股票分析数据"""
    # 使用数据采集器获取数据
    stock_codes = ['600519', '601318', '000001', '000002']
    stock_data = []
    
    for code in stock_codes:
        # 模拟数据，实际可以调用data_collector.get_stock_data(code)
        stock_info = {
            'code': code,
            'name': get_stock_name(code),
            'current_price': get_stock_price(code),
            'change': f"+{get_change_percentage(code)}%",
            'technical': {
                'ma5': get_moving_average(code, 5),
                'ma10': get_moving_average(code, 10),
                'ma20': get_moving_average(code, 20),
                'macd': '金叉',
                'rsi': get_rsi_value236(code),
                'signal': '买入'
            }
        }
        stock_data.append(stock_info)
    
    # 使用分析器进行分析
    analysis_result = analyzer.analyze_daily_trend([{'c': 1500}])  # 示例数据
    
    return jsonify({
        'status': 'success',
        'data': {
            'stock_data': stock_data,
            'analysis': analysis_result,
            'date': datetime.datetime.now().strftime('%Y-%m-%d'),
            'summary': '今日市场整体上涨'
        }
    })

@app.route('/api/stock/weekly')
def get_weekly_analysis():
    """获取每周股票分析数据"""
    # 模拟周度数据
    weekly_data = [
        {'c': 3200, 't': '2025-03-21'},
        {'c': 3195, 't': '2025-03-20'},
        {'c': 3180, 't': '2025-03-19'},
        {'c': 3165, 't': '2025-03-18'},
        {'c': 3150, 't': '2025-03-17'},
    ]
    
    # 使用分析器进行分析
    analysis_result = analyzer.analyze_weekly_trend(weekly_data)
    
    return jsonify({
        'status': 'success',
        'data': {
            'week': '2025-03-14至2025-03-21',
            'summary': analysis_result['summary'],
            'trend': analysis_result['weekly_trend'],
            'avg_change': analysis_result['avg_change'],
            'volatility': analysis_result['volatility'],
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
    sectors = ['金融', '科技', '医药', '房地产', '能源', '制造业']
    fund_flow_data = data_collector.calculate_fund_flow(sectors)
    
    return jsonify({
        'status': 'success',
        'data': {
            'date': datetime.datetime.now().strftime('%Y-%m-%d'),
            'sectors': fund_flow_data
        }
    })

@app.route('/api/ai/predictions')
def get_ai_predictions():
    """获取AI预测和建议"""
    predictions = data_collector.generate_ai_predictions()
    
    return jsonify({
        'status': 'success',
        'data': {
            'predictions': predictions,
            'date': datetime.datetime.now().strftime('%Y-%m-%d')
        }
    })

@app.route('/api/stock/sector-link')
def get_sector_linkage():
    """获取板块联动分析"""
    sectors = ['金融', '科技', '医药', '房地产', '能源', '制造业']
    linkage_data = analyzer.analyze_sector_linkage(sectors)
    
    return jsonify({
        'status': 'success',
        'data': {
            'date': datetime.datetime.now().strftime('%Y-%m-%d'),
            'linkage': [
                {
                    'sector_a': '金融',
                    'sector_b': '房地产',
                    'correlation': linkage_data.get('金融-房地产', 0.85),
                    'analysis': '信贷政策影响'
                },
                {
                    'sector_a': '科技',
                    'sector_b': '通信',
                    'correlation': linkage_data.get('科技-通信', 0.75),
                    'analysis': '技术革新推动'
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

@app.route('/api/stock/rolling')
def get_rolling_data():
    """获取个股滚动数据"""
    # 模拟滚动数据
    rolling_stocks = [
        {
            'code': '600519',
            'name': '贵州茅台',
            'price': 1500.50,
            'change': '+2.5%',
            'prediction': '上涨',
            'confidence': 85,
            'suggestion': '买入'
        },
        {
            'code': '601318',
            '3',
            'name': '中国平安',
            'price': 70.30,
            'change': '+1.2%',
            'prediction': '上涨',
            'confidence': 70,
            'suggestion': '买入'
        },
        {
            'code': '000001',
            'name': '平安银行',
            'price': 45.80,
            'change': '+0.8%',
            'prediction': '震荡',
            'confidence': 60,
            'suggestion': '持有'
        },
        {
            'code': '000002',
            'name': '万科A',
            'price': 32.50,
            'change': '+1.5%',
            'prediction': '上涨',
            'confidence': 65,
            'suggestion': '买入'
        }
    ]
    
    return jsonify({
        'status': 'success',
        'data': {
            'stocks': rolling_stocks,
            'date': datetime.datetime.now().strftime('%Y-%m-%d')
        }
    })

def get_stock_name(code):
    """获取股票名称"""
    stock_names = {
        '600519': '贵州茅台',
        '601318': '中国平安',
        '000001': '平安银行',
        '000002': '万科A',
        '600036': '招商银行',
        '601988': '中国银行'
    }
    return stock_names.get(code, '未知股票')

def get_stock_price(code):
    """获取股票价格"""
    stock_prices = {
        '600519': 1500.50,
        '601318': 70.30,
        '000001': 45.80,
        '000002': 32.50,
        '600036': 38.90,
        '601988': 4.20
    }
    return stock_prices.get(code, 0)

def get_change_percentage(code):
    """获取涨跌幅"""
    stock_changes = {
        '600519': 2.5,
        '601318': 1.2,
        '000001': 0.8,
        '000002': 1.5,
        '600036': 0.5,
        '601988': 0.3
    }
    return stock_changes.get(code, 0)

def get_moving_average(code, period):
    """获取移动平均线"""
    base_price = get_stock_price(code)
    if period == 5:
        return base_price * 0.98
    elif period == 10:
        return base_price * 0.96
    elif period == 20:
        return base_price * 0.94
    return base_price

def get_rsi_value236(code):
    """获取RSI值"""
    stock_rsi = {
        '600519': 65,
        '601318': 60,
        '000001': 55,
        '000002': 50,
        '600036': 58,
        '601988': 52
    }
    return stock_rsi.get(code, 50)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)