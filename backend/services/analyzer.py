import numpy as np
import pandas as pd
from typing import List, Dict

class StockAnalyzer:
    """股票分析器"""
    
    def analyze_daily_trend(self, stock_data: List[Dict]) -> Dict:
        """分析每日趋势"""
        if not stock_data:
            return {}
        
        # 计算技术指标
        closes = [item['c'] for item in stock_data]
        
        # 计算移动平均线
        ma5 = np.mean(closes[:5]) if len(closes) >= 5 else 0
        ma10 = np.mean(closes[:10]) if len(closes) >= 10 else 0
        ma20 = np.mean(closes[:20]) if len(closes) >= 20 else 0
        
        # 计算RSI
        rsi = self.calculate_rsi(closes)
        
        # 计算MACD信号
        macd_signal = self.calculate_macd(closes)
        
        # 判断趋势
        trend = "上涨" if closes[-1] > closes[-2] else "下跌"
        
        # 计算涨跌幅
        change_percentage = ((closes[-1] - closes[-2]) / closes[-2]) * 100
        
        return {
            'trend': trend,
            'change_percentage': change_percentage,
            'technical_indicators': {
                'ma5': ma5,
                'ma10': ma10,
                'ma20': ma20,
                'rsi': rsi,
                'macd': macd_signal,
                'signal': self.get_signal(ma5, ma10, ma20, rsi, macd_signal)
            }
        }
    
    def analyze_weekly_trend(self, weekly_data: List[Dict]) -> Dict:
        """分析周度趋势"""
        if not weekly_data:
            return {}
        
        # 计算周度指标
        weekly_closes = [item['c'] for item in weekly_data]
        
        avg_change = np.mean([((weekly_closes[i] - weekly_closes[i-1]) / weekly_closes[i-1]) * 100 
                              for i in range(1, len(weekly_closes))]) if len(weekly_closes) > 1 else 0
        
        volatility = np.std(weekly_closes) if weekly_closes else 0
        
        return {
            'avg_change': avg_change,
            'volatility': volatility,
            'weekly_trend': "上涨" if weekly_closes[-1] > weekly_closes[-2] else "下跌",
            'summary': self.generate_weekly_summary(avg_change, volatility)
        }
    
    def calculate_rsi(self, prices: List[float]) -> float:
        """计算RSI指标"""
        if len(prices) < 14:
            return 50  # 默认值
        
        gains = []
        losses = []
        
        for i in range(1, len(prices)):
            change = prices[i] - prices[i-1]
            if change > 0:
                gains.append(change)
            else:
                losses.append(-change)
        
        avg_gain = np.mean(gains[-14:]) if gains else 0
        avg_loss = np.mean(losses[-14:]) if losses else 0
        
        if avg_loss == 0:
            return 100
        
        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
        
        return rsi
    
    def calculate_macd(self, prices: List[float]) -> str:
        """计算MACD信号"""
        if len(prices) < 26:
            return "未知"
        
        # 计算EMA
        ema12 = self.calculate_ema(prices, 12)
        ema26 = self.calculate_ema(prices, 26)
        
        macd_line = ema12 - ema26
        
        signal_line = self.calculate_ema([macd_line], 9)
        
        if macd_line > signal_line:
            return "金叉"
        elif macd_line < signal_line:
            return "死叉"
        else:
            return "平稳"
    
    def calculate_ema(self, prices: List[float], period: int) -> float:
        """计算EMA"""
        if len(prices) < period:
            return np.mean(prices) if prices else 0
        
        multiplier = 2 / (period + 1)
        
        # 初始EMA为简单平均值
        ema = np.mean(prices[:period])
        
        for price in prices[period:]:
            ema = (price - ema) * multiplier + ema
        
        return ema
    
    def get_signal(self, ma5: float, ma10: float, ma20: float, rsi: float, macd: str) -> str:
        """根据技术指标给出信号"""
        signals = []
        
        # MA判断
        if ma5 > ma10 > ma20:
            signals.append("多头排列")
        elif ma5 < ma10 < ma20:
            signals.append("空头排列")
        
        # RSI判断
        if rsi > 70:
            signals.append("RSI超买")
        elif rsi < 30:
            signals.append("RSI超卖")
        
        # MACD判断
        if macd == "金叉":
            signals.append("MACD金叉")
        elif macd == "死叉":
            signals.append("MACD死叉")
        
        # 综合判断
        if signals.count("多头排列") > 0 and signals.count("MACD金叉") > 0:
            return "买入"
        elif signals.count("空头排列") > 0 and signals.count("MACD死叉") > 0:
            return "卖出"
        else:
            return "持有"
    
    def generate_weekly_summary(self, avg_change: float, volatility: float) -> str:
        """生成周度总结"""
        if avg_change > 5:
            summary = "本周市场表现强劲，大幅上涨"
        elif avg_change > 2:
            summary = "本周市场表现良好，稳步上涨"
        elif avg_change > 0:
            summary = "本周市场小幅上涨"
        elif avg_change < -5:
            summary = "本周市场表现疲软，大幅下跌"
        elif avg_change < -2:
            summary = "本周市场表现不佳，稳步下跌"
        else:
            summary = "本周市场平稳"
        
        if volatility > 10:
            summary += ", 波动性较高"
        elif volatility > 5:
            summary += ", 波动性中等"
        else:
            summary += ", 波动性较低"
        
        return summary
    
    def analyze_sector_linkage(self, sectors: List[str]) -> Dict:
        """分析板块联动"""
        # 这里可以扩展为更复杂的联动分析
        correlations = {}
        
        # 模拟板块联动关系
        sector_links = [
            ('金融', '房地产', 0.85),
            ('科技', '通信', 0.75),
            ('医药', '生物技术', 0.70),
            ('能源', '化工', 0.65),
            ('制造业', '工业', 0.60)
        ]
        
        for sector_a, sector_b, correlation in sector_links:
            correlations[f"{sector_a}-{sector_b}"] = correlation
        
        return correlations